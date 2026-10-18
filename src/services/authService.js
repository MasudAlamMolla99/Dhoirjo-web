import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase";

export const registerUser = async ({
  name,
  email,
  password,
}) => {

  const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  const firebaseUser =
    userCredential.user;

  await updateProfile(firebaseUser, {
    displayName: name,
  });

  await setDoc(
    doc(
      db,
      "users",
      firebaseUser.uid
    ),
    {
      name,
      email,
      role: "admin",
      createdAt: serverTimestamp(),
    }
  );

  return firebaseUser;
};

export const loginUser = async ({
  email,
  password,
}) => {

  const userCredential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  const firebaseUser =
    userCredential.user;

  const userRef = doc(
    db,
    "users",
    firebaseUser.uid
  );

  const userSnapshot =
    await getDoc(userRef);

  if (!userSnapshot.exists()) {
    throw new Error(
      "User profile not found."
    );
  }

  const userData =
    userSnapshot.data();

  return {
    uid: firebaseUser.uid,
    ...userData,
  };
};

export const logoutUser = async () => {
  await signOut(auth);
};