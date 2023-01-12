import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { doesNotMatch } from 'assert';

describe('UserAuthController E2E Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())
    await app.init();
  });

  let token = ""

  describe('Creating users', () => {

  
  it('Should create a new user', () => {

    return request(app.getHttpServer()).post('/auth/create').send({
        username: 'user1',
        password: 'password1',
    }).expect(201);
  })


  it('Should fail when creating same user', () => {

    return request(app.getHttpServer()).post('/auth/create').send({
        username: 'user1',
        password: 'password1',
    }).expect(400);
  })
  
  it('Should create a new user2', () => {
    return request(app.getHttpServer()).post('/auth/create').send({
      username: 'user2',
      password: 'password1',
  }).expect(201);

  })

  it('Should fail when username is empty', () => {
    return request(app.getHttpServer()).post('/auth/login').send({
        username: '',
        password: 'password1',
    }).expect(400);
  })

  it('Should fail when password is empty', () => {
    return request(app.getHttpServer()).post('/auth/login').send({
        username: 'user2',
        password: '',
    }).expect(400);
  })
})

describe('Logging in', () => {
  it('Should fail to login with empty username', () => {
    return request(app.getHttpServer()).post('/auth/login').send({
        username: '',
        password: 'password1',
    }).expect(400);
  })

  it('Should fail to login with empty password', () => {
    return request(app.getHttpServer()).post('/auth/login').send({
        username: 'user1',
        password: '',
    }).expect(400);
  })


  it('Should fail to login with non-existing user', () => {
    return request(app.getHttpServer()).post('/auth/login').send({
        username: 'user2',
        password: 'password2',
    }).expect(400);
  })


  it('Should login with existing user', (done) => {
    request(app.getHttpServer()).post('/auth/login').send({
        username: 'user1',
        password: 'password1',
    }).expect(201).end((err, res) => {
      token = res['_body'].token; //finds auth token
      console.log(token)
      done();
    });
  })
  




})
})