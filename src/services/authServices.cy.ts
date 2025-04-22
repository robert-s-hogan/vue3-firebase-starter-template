// src/services/authServices.cy.ts
import { login, logout, register, loginWithGoogle } from './authServices'
import sinon from 'sinon'
// Import the Auth type from firebase/auth if you use Partial<Auth>
// import type { Auth } from 'firebase/auth';

describe('Auth Service', () => {
  // Define a type for your mock Auth object.
  // No need for Partial<Auth> unless you're passing the mock to something
  // that expects a full Auth object, which your services don't currently.
  // Just defining the methods you stub is sufficient.
  interface MockAuth {
    signInWithEmailAndPassword: sinon.SinonStub
    signOut: sinon.SinonStub
    createUserWithEmailAndPassword: sinon.SinonStub
    signInWithPopup: sinon.SinonStub
    // Add any other Firebase Auth properties/methods your services might *use*
    // (even if not stubbed in this test, the service function might try to access them)
    // For example, if a service function used auth.currentUser, you'd add:
    // currentUser: any; // Or a more specific User | null type
  }

  let mockAuth: MockAuth

  beforeEach(() => {
    // Re-create the mock object before each test
    mockAuth = {
      signInWithEmailAndPassword: sinon.stub(),
      signOut: sinon.stub(),
      createUserWithEmailAndPassword: sinon.stub(),
      signInWithPopup: sinon.stub(),
      // If adding currentUser:
      // currentUser: null, // Or a mock user if needed
    }
  })

  describe('login function', () => {
    it('should handle login errors correctly', async () => {
      const errorMessage = 'Login failed'
      // Mocking with a standard Error instance
      mockAuth.signInWithEmailAndPassword.rejects(new Error(errorMessage))

      try {
        // Note: You are passing mockAuth.signInWithEmailAndPassword as the signInFn,
        // but the function signature expects a type compatible with typeof signInWithEmailAndPassword.
        // Sinon stubs are usually compatible enough.
        await login(
          mockAuth as any, // Type assertion might be needed if MockAuth is too strict
          'test@example.com',
          'wrongpassword',
          mockAuth.signInWithEmailAndPassword as any, // Type assertion here too
        )
        // If the promise *wasn't* rejected, the test should fail
        throw new Error('Expected promise to be rejected, but it was resolved')
      } catch (error: unknown) {
        // Error is unknown
        // Assert the error is an Error instance to access .message
        const err = error as Error
        expect(err.message).to.equal(errorMessage)
      }
    })

    it('should return user on successful login', async () => {
      const mockUser = { uid: '12345', email: 'test@example.com' }
      // Mocking the resolved value structure { user: ... }
      mockAuth.signInWithEmailAndPassword.resolves({ user: mockUser })

      const result = await login(
        mockAuth as any, // Type assertion if needed
        'test@example.com',
        'correctpassword',
        mockAuth.signInWithEmailAndPassword as any, // Type assertion if needed
      )
      // Your login service returns credential.user, which matches mockUser
      expect(result).to.deep.equal(mockUser)
    })
  })

  describe('logout function', () => {
    it('should call signOut and complete successfully', async () => {
      mockAuth.signOut.resolves()

      await logout(mockAuth as any, mockAuth.signOut as any) // Type assertions if needed

      expect(mockAuth.signOut).to.have.been.calledOnce
    })

    it('should handle errors during logout', async () => {
      const errorMessage = 'Logout failed'
      mockAuth.signOut.rejects(new Error(errorMessage)) // Mocking with Error instance

      try {
        await logout(mockAuth as any, mockAuth.signOut as any) // Type assertions if needed
        throw new Error('Expected promise to be rejected, but it was resolved')
      } catch (error: unknown) {
        // Error is unknown
        const err = error as Error // Assert as Error
        expect(err.message).to.equal(errorMessage)
      }
    })
  })

  describe('register function', () => {
    it('should handle registration errors correctly', async () => {
      // Mocking with an object structure that mimics FirebaseError
      // Your register service catches this and re-throws a standard Error with a custom message
      mockAuth.createUserWithEmailAndPassword.rejects({
        code: 'auth/email-already-in-use',
        message: 'The email address is already in use.',
      })

      try {
        // The register function *under test* will throw an Error('This email is already registered.')
        await register(
          mockAuth as any,
          'existing-email@example.com',
          'password123',
          mockAuth.createUserWithEmailAndPassword as any,
        )
        throw new Error('Expected registration to fail')
      } catch (error: unknown) {
        // Error is unknown
        // The error caught *here* is the one re-thrown by your register service, which is an Error instance
        const err = error as Error // Assert as Error
        expect(err.message).to.equal(
          // Expect the specific error message your service re-throws
          'This email is already registered.',
        )
      }
    })

    it('should return user on successful registration', async () => {
      const mockUserCredential = {
        user: { email: 'new-user@example.com', uid: 'abc' },
      } // Add uid as user might have it
      mockAuth.createUserWithEmailAndPassword.resolves(mockUserCredential)

      const userCredential = await register(
        mockAuth as any, // Type assertion if needed
        'new-user@example.com',
        'password123',
        mockAuth.createUserWithEmailAndPassword as any, // Type assertion if needed
      )
      // Your register service returns the userCredential directly
      expect(userCredential).to.equal(mockUserCredential)
    })
  })

  describe('loginWithGoogle function', () => {
    it('should handle Google login errors correctly', async () => {
      const errorMessage = 'Google login failed'
      mockAuth.signInWithPopup.rejects(new Error(errorMessage)) // Mocking with Error instance

      try {
        // The loginWithGoogle function under test returns credential.user on success,
        // but throws the original error on failure.
        await loginWithGoogle(mockAuth as any, mockAuth.signInWithPopup as any) // Type assertions if needed
        throw new Error('Expected promise to be rejected, but it was resolved')
      } catch (error: unknown) {
        // Error is unknown
        const err = error as Error // Assert as Error (or FirebaseError if you want to check .code etc.)
        expect(err.message).to.equal(errorMessage)
      }
    })

    it('should return user on successful Google login', async () => {
      const mockUser = { uid: '12345', email: 'test@example.com' }
      mockAuth.signInWithPopup.resolves({ user: mockUser }) // Mocking resolved value structure { user: ... }

      const result = await loginWithGoogle(
        mockAuth as any,
        mockAuth.signInWithPopup as any,
      ) // Type assertions if needed
      // Your loginWithGoogle service returns credential.user, which matches mockUser
      expect(result).to.deep.equal(mockUser)
    })
  })
})
