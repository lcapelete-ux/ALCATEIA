-- =====================================================================
-- Cria (ou conserta) o login do organizador.
-- 1) Troque COLOQUE_SUA_SENHA_AQUI pela senha que voce quer usar.
-- 2) Rode no SQL Editor.
-- No site: usuario "alcateia" + essa senha.
-- Se o usuario ja existir, a senha e redefinida e o e-mail e confirmado.
-- =====================================================================
do $$
declare
  v_email    text := 'lcapelete+alcateia@gmail.com';
  v_password text := 'COLOQUE_SUA_SENHA_AQUI';
  v_id       uuid;
begin
  if v_password = 'COLOQUE_SUA_SENHA_AQUI' or length(v_password) < 8 then
    raise exception 'Troque a senha na linha v_password (mínimo 8 caracteres).';
  end if;

  v_id := (select id from auth.users where email = v_email);

  if v_id is null then
    v_id := gen_random_uuid();
    insert into auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at,
      confirmation_token, recovery_token, email_change, email_change_token_new
    ) values (
      '00000000-0000-0000-0000-000000000000', v_id, 'authenticated', 'authenticated',
      v_email, extensions.crypt(v_password, extensions.gen_salt('bf')),
      now(), '{"provider":"email","providers":["email"]}', '{}',
      now(), now(), '', '', '', ''
    );
    insert into auth.identities (
      id, user_id, provider_id, identity_data, provider,
      last_sign_in_at, created_at, updated_at
    ) values (
      gen_random_uuid(), v_id, v_id::text,
      jsonb_build_object('sub', v_id::text, 'email', v_email, 'email_verified', true),
      'email', now(), now(), now()
    );
  else
    update auth.users
       set encrypted_password = extensions.crypt(v_password, extensions.gen_salt('bf')),
           email_confirmed_at = coalesce(email_confirmed_at, now()),
           banned_until = null,
           updated_at = now()
     where id = v_id;
  end if;
end;
$$;

-- Conferencia: deve mostrar 1 linha com email_confirmed_at preenchido
select email, email_confirmed_at, last_sign_in_at from auth.users
 where email = 'lcapelete+alcateia@gmail.com';
