import * as fs from 'fs'
import * as firebase from '@firebase/testing'

const testName = 'firestore-test'

describe(testName, () => {
  beforeAll(async () => {
    await firebase.loadFirestoreRules({
      projectId: testName,
      rules: fs.readFileSync('firestore.rules', 'utf8'),
    })
  })

  // テスト終了後にデータを削除します
  afterEach(async () => {
    await firebase.clearFirestoreData({ projectId: testName })
  })

  // テスト終了後にアプリを削除します
  afterAll(async () => {
    await Promise.all(firebase.apps().map((app) => app.delete()))
  })

  // 認証済のFirestore
  function authDB(auth) {
    return firebase
      .initializeTestApp({ projectId: testName, auth: auth })
      .firestore()
  }

  // 未認証のFirestore
  function noAuthDB() {
    return firebase
      .initializeTestApp({ projectId: testName, auth: null })
      .firestore()
  }

  describe('users collection', () => {
    describe('read', () => {

      test('未ログインの場合、データ取得に失敗するかどうか', async () => {
        const db = noAuthDB()
        await firebase.assertFails(db.collection('users').doc('tech-user').get())
      })

      test('ログイン済みの場合は、ユーザーデータを取得', async () => {
        const db = authDB({ uid: 'tech-user' })
        await firebase.assertSucceeds
          (
            db.collection('users').doc('tech-user').get()
          )
      })
    })

    describe('create', () => {
      test('自分のアカウントデータを作成できるか', async () => {
        const db = authDB({ uid: 'tech-user' })
        await firebase.assertSucceeds(
          db.collection('users').doc('tech-user').set({
            name: 'testUser',
            iconImageUrl: 'https://example.com',
          })
        )
      })

      test('ユーザ名が未入力の場合は作成に失敗するか', async () => {
        const db = authDB({ uid: 'tech-user' })
        await firebase.assertFails(
          db.collection('users').doc('tech-user').set({
            name: '',
            iconImageUrl: 'https://example.com',
          })
        )
      })

      test('アイコン画像が未入力の場合、失敗するか', async () => {
        const db = authDB({ uid: 'tech-user' })
        await firebase.assertFails(
          db.collection('users').doc('tech-user').set({
            name: 'testUser',
            iconImageUrl: '',
          })
        )
      })

      test('他人のアカウントのデータ作成、失敗するか', () => {
        const db = authDB({ uid: 'tech-user' })
        firebase.assertFails(
          db.collection('users').doc('tech-user2').set({
            name: 'testUser',
            iconImageUrl: 'https://example.com',
          })
        )
      })

    })
  })
})
