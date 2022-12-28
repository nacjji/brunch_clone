'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KakaoUsers', {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      socialId: {
        type: Sequelize.STRING,
      },
      writer: {
        type: Sequelize.STRING,
      },
      profileImage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      selfIntro: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      accessToken: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('KakaoUsers');
  },
};
