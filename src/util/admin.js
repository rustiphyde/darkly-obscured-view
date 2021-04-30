import * as admin from 'firebase-admin';
import { serviceAccountKey } from '../serviceAccountKey.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    databaseURL: "https//mostlyghostly-21021.firebaseio.com",
    storageBucket: "mostlyghostly-21021.appspot.com"
})

export default admin;