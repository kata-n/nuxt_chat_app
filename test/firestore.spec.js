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
})
