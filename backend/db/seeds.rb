# Admin
User.find_or_create_by!(email: "admin@email.com") do |user|
  user.password = "123456"
  user.nome = "Administrador"
  user.role = :administrador
end
