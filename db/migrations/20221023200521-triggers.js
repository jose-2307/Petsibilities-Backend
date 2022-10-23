'use strict';

module.exports = {
  async up (queryInterface) {
    await queryInterface.sequelize.query(
      'CREATE OR REPLACE FUNCTION petition_acepted()'+
      ' RETURNS TRIGGER'+
      ' Language plpgsql'+
      ' AS $$'+
      ' DECLARE'+
        ' _pet INTEGER;'+
      ' BEGIN'+
        ' IF (new.acepted = False) THEN'+
            " RAISE EXCEPTION 'ERROR: action denied.';"+
        ' END IF;'+
        ' SELECT up.pet_id INTO _pet FROM (SELECT * FROM users_pets WHERE id = old.user_pet_id) as up;'+
        " INSERT INTO users_pets(user_id,pet_id,date) VALUES(old.user_id,_pet,to_char(current_date, 'yyyy-MM-dd'));"+
        ' UPDATE pets SET adopted = True WHERE id = _pet;'+
        ' RETURN new;'+
      ' END;'+
      ' $$');

    await queryInterface.sequelize.query(
      'CREATE TRIGGER trigger_petition_acepted '+
      'BEFORE UPDATE ON petitions '+
      'FOR EACH ROW EXECUTE FUNCTION petition_acepted();'
    );
  },

  async down (queryInterface) {
    await queryInterface.sequelize.query("DROP TRIGGER trigger_petition_acepted ON petitions");
    await queryInterface.sequelize.query("DROP FUNCTION petition_acepted;");
  }
};
