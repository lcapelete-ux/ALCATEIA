-- =====================================================================
-- Copia as inscricoes da tabela antiga "participants" para a nova
-- "treinao_participants". Rode DEPOIS do 01_banco_completo.sql.
-- A tabela antiga NAO e alterada nem apagada (fica como backup).
-- Pode rodar de novo: CPFs ja copiados sao ignorados.
-- Funciona com colunas em qualquer formato (fullName, fullname, full_name...).
-- =====================================================================
do $$
declare
  r        jsonb;
  v_cpf    text;
  v_bib    integer;
  v_status text;
  copiadas integer := 0;
  puladas  integer := 0;
begin
  for r in select to_jsonb(p) from public.participants p loop
    begin
      v_cpf := regexp_replace(coalesce(r->>'cpf', ''), '\D', '', 'g');
      if length(v_cpf) <> 11 then
        raise exception 'CPF incompleto ou mascarado';
      end if;
      if exists (select 1 from public.treinao_participants where cpf = v_cpf) then
        continue;
      end if;

      v_bib := nullif(coalesce(r->>'bibnumber', r->>'bibNumber', r->>'bib_number'), '')::integer;
      if v_bib is null or exists (select 1 from public.treinao_participants where bibnumber = v_bib) then
        v_bib := (select coalesce(max(bibnumber), 0) + 1 from public.treinao_participants);
      end if;

      v_status := coalesce(r->>'paymentstatus', r->>'paymentStatus', r->>'payment_status', '');
      v_status := case
        when v_status in ('Pago', 'Confirmado', 'paid') then 'Pago'
        when v_status ilike 'Aguardando%' then 'Aguardando conferência'
        else 'Pendente'
      end;

      insert into public.treinao_participants
        (bibnumber, fullname, cpf, gender, birthdate, team, city, consent, kit_eligible,
         paymentstatus, payer_name, created_at)
      values (
        v_bib,
        coalesce(r->>'fullname', r->>'fullName', r->>'full_name', r->>'name'),
        v_cpf,
        coalesce(r->>'gender', ''),
        left(coalesce(r->>'birthdate', r->>'birthDate', r->>'birth_date'), 10)::date,
        nullif(coalesce(r->>'team', ''), ''),
        coalesce(r->>'city', ''),
        true,
        v_bib <= 150,
        v_status,
        coalesce(r->>'payer_name', r->>'payerName'),
        coalesce(nullif(coalesce(r->>'created_at', r->>'createdAt'), '')::timestamptz, now())
      );
      copiadas := copiadas + 1;
    exception when others then
      puladas := puladas + 1;
      raise notice 'Não copiada (%): %', sqlerrm, r;
    end;
  end loop;

  raise notice 'Copiadas: %, não copiadas: %', copiadas, puladas;
end;
$$;

-- Conferencia: antiga x nova
select 'antiga' as tabela, count(*) from public.participants
union all
select 'nova', count(*) from public.treinao_participants;
