'use strict';

module.exports = {
  async up (queryInterface) {
    await queryInterface.sequelize.query(
      'CREATE OR REPLACE FUNCTION petition_accepted()'+
      ' RETURNS TRIGGER'+
      ' Language plpgsql'+
      ' AS $$'+
      ' DECLARE'+
        ' _pet INTEGER;'+
      ' BEGIN'+
        ' IF (new.accepted = True) THEN'+
          ' SELECT up.pet_id INTO _pet FROM (SELECT * FROM users_pets WHERE id = old.user_pet_id) as up;'+
          " INSERT INTO users_pets(user_id,pet_id,date) VALUES(old.user_id,_pet,current_date);"+
          ' UPDATE pets SET adopted = True WHERE id = _pet;'+
        ' END IF;'+
        ' RETURN new;'+
      ' END;'+
      ' $$');

    await queryInterface.sequelize.query(
      'CREATE TRIGGER trigger_petition_accepted '+
      'BEFORE UPDATE ON petitions '+
      'FOR EACH ROW EXECUTE FUNCTION petition_accepted();'
    );
  },

  async down (queryInterface) {
    await queryInterface.sequelize.query("DROP TRIGGER trigger_petition_accepted ON petitions");
    await queryInterface.sequelize.query("DROP FUNCTION petition_accepted;");
  }
};
