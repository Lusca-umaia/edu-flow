require "test_helper"

class ProfessorsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @professor = professors(:one)
  end

  test "should get index" do
    get professors_url, as: :json
    assert_response :success
  end

  test "should create professor" do
    assert_difference("Professor.count") do
      post professors_url, params: { professor: { cpf: @professor.cpf, turma_id_id: @professor.turma_id_id, user_id_id: @professor.user_id_id } }, as: :json
    end

    assert_response :created
  end

  test "should show professor" do
    get professor_url(@professor), as: :json
    assert_response :success
  end

  test "should update professor" do
    patch professor_url(@professor), params: { professor: { cpf: @professor.cpf, turma_id_id: @professor.turma_id_id, user_id_id: @professor.user_id_id } }, as: :json
    assert_response :success
  end

  test "should destroy professor" do
    assert_difference("Professor.count", -1) do
      delete professor_url(@professor), as: :json
    end

    assert_response :no_content
  end
end
