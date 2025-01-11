SELECT pa.path, pa.ui_code, pa.description
FROM user_roles ur
INNER JOIN roles_profiles rp ON ur.role_id = rp.role_id
INNER JOIN profiles_access pa ON rp.profile_id = pa.profile_id
WHERE ur.user_id = $1;
