export class FirebaseUpdateProfileSuccess {
    constructor(
        public localId: string,
        public email: string,
        public displayName: string,
        public photoUrl: string,
        public idToken: string,
        public refreshToken: string,
        public expiresIn: string, 
        
    ) {}
}
