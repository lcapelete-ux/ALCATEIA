-- =====================================================================
-- Treinão Solidário Alcateia — banco de dados completo
-- Rode este arquivo INTEIRO no Supabase: SQL Editor > New query > Run.
-- Pode rodar mais de uma vez sem problema (não apaga inscrições).
-- =====================================================================

-- ---------- Tabela de inscrições ----------
create table if not exists public.treinao_participants (
  id                 uuid primary key default gen_random_uuid(),
  bibnumber          integer not null unique,
  fullname           text not null check (char_length(trim(fullname)) between 3 and 120),
  cpf                text not null unique check (cpf ~ '^\d{11}$'),
  gender             text not null,
  birthdate          date not null,
  team               text,
  city               text not null,
  consent            boolean not null default false,
  kit_eligible       boolean not null default false,
  paymentstatus      text not null default 'Pendente'
                     check (paymentstatus in ('Pendente', 'Aguardando conferência', 'Pago')),
  payer_name         text,
  payment_claimed_at timestamptz,
  paid_at            timestamptz,
  created_at         timestamptz not null default now()
);

-- Sem políticas = ninguém acessa a tabela direto pela internet.
-- Todo acesso passa pelas funções abaixo, que validam tudo.
alter table public.treinao_participants enable row level security;
revoke all on public.treinao_participants from anon, authenticated;

-- ---------- Quem é organizador ----------
create table if not exists public.treinao_admins (
  email text primary key
);
alter table public.treinao_admins enable row level security;
revoke all on public.treinao_admins from anon, authenticated;

insert into public.treinao_admins (email)
values ('lcapelete+alcateia@gmail.com')
on conflict do nothing;

create or replace function public.treinao_require_admin()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'Sua sessão expirou. Entre novamente.' using errcode = '28000';
  end if;
  if not exists (
    select 1 from public.treinao_admins
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  ) then
    raise exception 'Acesso restrito ao organizador.' using errcode = '42501';
  end if;
end;
$$;

-- ---------- Inscrição (público) ----------
create or replace function public.treinao_register(
  p_fullname text,
  p_cpf text,
  p_gender text,
  p_birthdate date,
  p_team text,
  p_city text,
  p_consent boolean
)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_cpf text := regexp_replace(coalesce(p_cpf, ''), '\D', '', 'g');
  v_bib integer;
begin
  if not coalesce(p_consent, false) then
    raise exception 'Marque a autorização de uso dos dados para continuar.';
  end if;
  if char_length(trim(coalesce(p_fullname, ''))) < 3 then
    raise exception 'Informe o nome completo.';
  end if;
  if length(v_cpf) <> 11 then
    raise exception 'Confira o CPF digitado.';
  end if;
  if coalesce(trim(p_gender), '') = '' or p_birthdate is null or coalesce(trim(p_city), '') = '' then
    raise exception 'Preencha todos os campos obrigatórios.';
  end if;
  if exists (select 1 from treinao_participants where cpf = v_cpf) then
    raise exception 'Este CPF já está inscrito. Se já pagou, use a confirmação de Pix.';
  end if;

  -- trava para dois inscritos simultâneos não pegarem o mesmo número
  perform pg_advisory_xact_lock(20261108);
  select coalesce(max(bibnumber), 0) + 1 into v_bib from treinao_participants;

  insert into treinao_participants
    (bibnumber, fullname, cpf, gender, birthdate, team, city, consent, kit_eligible)
  values
    (v_bib, trim(p_fullname), v_cpf, trim(p_gender), p_birthdate,
     nullif(trim(coalesce(p_team, '')), ''), trim(p_city), true, v_bib <= 150);

  return json_build_object('bibnumber', v_bib, 'kitEligible', v_bib <= 150);
end;
$$;

-- ---------- Corredor informa que pagou o Pix (público) ----------
create or replace function public.treinao_confirm_payment(p_cpf text, p_payer_name text)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_cpf text := regexp_replace(coalesce(p_cpf, ''), '\D', '', 'g');
  v_status text;
begin
  select paymentstatus into v_status from treinao_participants where cpf = v_cpf;
  if not found then
    raise exception 'Não encontramos inscrição com esse CPF.';
  end if;
  if v_status = 'Pago' then
    return json_build_object('message', 'Seu pagamento já está confirmado. Nos vemos na largada!');
  end if;

  update treinao_participants
     set paymentstatus = 'Aguardando conferência',
         payer_name = nullif(trim(coalesce(p_payer_name, '')), ''),
         payment_claimed_at = now()
   where cpf = v_cpf;

  return json_build_object('message', 'Recebemos sua confirmação. A organização vai conferir o Pix.');
end;
$$;

-- ---------- Painel do organizador ----------
create or replace function public.treinao_admin_list()
returns json
language plpgsql
security definer
set search_path = public
as $$
begin
  perform treinao_require_admin();
  return json_build_object('participants', coalesce((
    select json_agg(json_build_object(
      'id', id,
      'bibnumber', bibnumber,
      'fullname', fullname,
      'cpf_masked', substr(cpf, 1, 3) || '.***.***-' || substr(cpf, 10, 2),
      'gender', gender,
      'birthdate', birthdate,
      'team', team,
      'city', city,
      'payer_name', payer_name,
      'paymentstatus', paymentstatus
    ) order by bibnumber)
    from treinao_participants
  ), '[]'::json));
end;
$$;

create or replace function public.treinao_admin_check_payment(p_cpf text)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row treinao_participants;
begin
  perform treinao_require_admin();
  select * into v_row from treinao_participants
   where cpf = regexp_replace(coalesce(p_cpf, ''), '\D', '', 'g');
  if not found then
    return json_build_object('found', false);
  end if;
  return json_build_object(
    'found', true,
    'claimed', v_row.paymentstatus in ('Aguardando conferência', 'Pago'),
    'paymentStatus', v_row.paymentstatus
  );
end;
$$;

create or replace function public.treinao_admin_mark_paid(p_participant_id uuid)
returns json
language plpgsql
security definer
set search_path = public
as $$
begin
  perform treinao_require_admin();
  update treinao_participants
     set paymentstatus = 'Pago', paid_at = now()
   where id = p_participant_id;
  if not found then
    raise exception 'Inscrição não encontrada.';
  end if;
  return json_build_object('ok', true);
end;
$$;

-- ---------- Permissões ----------
revoke all on function public.treinao_require_admin() from public, anon, authenticated;
revoke all on function public.treinao_register(text, text, text, date, text, text, boolean) from public;
revoke all on function public.treinao_confirm_payment(text, text) from public;
revoke all on function public.treinao_admin_list() from public, anon;
revoke all on function public.treinao_admin_check_payment(text) from public, anon;
revoke all on function public.treinao_admin_mark_paid(uuid) from public, anon;

grant execute on function public.treinao_register(text, text, text, date, text, text, boolean) to anon, authenticated;
grant execute on function public.treinao_confirm_payment(text, text) to anon, authenticated;
grant execute on function public.treinao_admin_list() to authenticated;
grant execute on function public.treinao_admin_check_payment(text) to authenticated;
grant execute on function public.treinao_admin_mark_paid(uuid) to authenticated;

-- Faz a API enxergar as funções novas na hora
notify pgrst, 'reload schema';
