-- =====================================================================
-- Permite ao organizador mudar o pagamento de qualquer inscricao
-- para Pendente, Aguardando conferencia ou Pago (inclusive desfazer).
-- Rode no SQL Editor numa query nova. Pode rodar mais de uma vez.
-- =====================================================================
create or replace function public.treinao_admin_set_status(p_participant_id uuid, p_status text)
returns json
language plpgsql
security definer
set search_path = public
as $$
begin
  perform treinao_require_admin();
  if p_status not in ('Pendente', 'Aguardando conferência', 'Pago') then
    raise exception 'Status inválido.';
  end if;
  update treinao_participants
     set paymentstatus = p_status,
         paid_at = case when p_status = 'Pago' then coalesce(paid_at, now()) else null end
   where id = p_participant_id;
  if not found then
    raise exception 'Inscrição não encontrada.';
  end if;
  return json_build_object('ok', true, 'paymentstatus', p_status);
end;
$$;

revoke all on function public.treinao_admin_set_status(uuid, text) from public, anon;
grant execute on function public.treinao_admin_set_status(uuid, text) to authenticated;

notify pgrst, 'reload schema';
