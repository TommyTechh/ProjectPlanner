import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { AppModule } from './../src/app.module';
import { doesNotMatch } from 'assert';

describe('App E2E Test', () => {

  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe(),
    );
    await app.init();
    await app.listen(3332)
    pactum.request.setBaseUrl("http://localhost:3332")
  });

  afterAll(() => {
    app.close();
  });

  const userDto1 ={
    username: "user1",
    password: "password1"
  }
  const userDto2 ={
    username: "user2",
    password: "password2"
  }
  const userDto3 ={
    username: "user3",
    password: "password3"
  }

  const taskDto1 = {
    title: "task1",
    description: "description1"
  }

  describe('Creating users', () => {

  
  it('Should create a new user', () => {
    return pactum 
    .spec()
    .post('/auth/create')
    .withBody(userDto1)
    .expectStatus(201);
  })


  it('Should fail when creating same user', () => {
    return pactum 
    .spec()
    .post('/auth/create')
    .withBody(userDto1)
    .expectStatus(400);
  })
  
  it('Should create a new user2', () => {
    return pactum 
    .spec()
    .post('/auth/create')
    .withBody(userDto2)
    .expectStatus(201);
  })

  it('Should fail when username is empty', () => {
    return pactum 
    .spec()
    .post('/auth/create')
    .withBody(userDto2.password)
    .expectStatus(400);
  })

  it('Should fail when password is empty', () => {
    return pactum 
    .spec()
    .post('/auth/create')
    .withBody(userDto2.username)
    .expectStatus(400);
  })
})

describe('Logging in', () => {
  it('Should fail to login with empty username', () => {
    return pactum 
    .spec()
    .post('/auth/login')
    .withBody(userDto1.password)
    .expectStatus(400);
  })

  it('Should fail to login with empty password', () => {
    return pactum 
    .spec()
    .post('/auth/login')
    .withBody(userDto1.username)
    .expectStatus(400);
  })


  it('Should fail to login with non-existing user', () => {
    return pactum 
    .spec()
    .post('/auth/login')
    .withBody(userDto3)
    .expectStatus(400);
  })


  it('Should login with existing user', () => {
    return pactum 
    .spec()
    .post('/auth/login')
    .withBody(userDto1)
    .expectStatus(201)
    .stores("userToken", "token");
    });
  })


  describe('Update user', () => {
    it('should get current user', () => {
      return pactum 
    .spec()
    .get('/auth/me')
    .withHeaders({
      Authorization: 'Bearer $S{userToken}'
    })
    .expectStatus(200)
    })

    it('should update current user', () => {
      return pactum 
    .spec()
    .patch('/auth/me')
    .withHeaders({
      Authorization: 'Bearer $S{userToken}'
    })
    .withBody({
      username: "update1",
      password: "update2"
    })
    .expectStatus(200)
    })


    it('should fail to update current user with empty password', () => {
      return pactum 
    .spec()
    .patch('/auth/me')
    .withHeaders({
      Authorization: 'Bearer $S{userToken}'
    })
    .withBody(userDto1.password)
    .expectStatus(400)
    })

    it('should fail to update current user with empty username', () => {
      return pactum 
    .spec()
    .patch('/auth/me')
    .withHeaders({
      Authorization: 'Bearer $S{userToken}'
    })
    .withBody(userDto1.username)
    .expectStatus(400)
    })
  })


  describe('Tasks', () => {

    it('Should create a task', () => {
    return pactum 
    .spec()
    .post('/tasks/task')
    .withHeaders({
      Authorization: 'Bearer $S{userToken}'
    })
    .withBody(taskDto1)
    .expectStatus(201)
    })

    it('Should fail to create a task with no title', () => {
      return pactum 
      .spec()
      .post('/tasks/task')
      .withHeaders({
        Authorization: 'Bearer $S{userToken}'
      })
      .withBody(taskDto1.description)
      .expectStatus(400)
      })

      it('Should fail to create a task with no description', () => {
        return pactum 
        .spec()
        .post('/tasks/task')
        .withHeaders({
          Authorization: 'Bearer $S{userToken}'
        })
        .withBody(taskDto1.title)
        .expectStatus(400)
        })
  })
})
