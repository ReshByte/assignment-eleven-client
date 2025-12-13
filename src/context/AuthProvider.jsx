import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile 
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config.js';
import Swal from 'sweetalert2';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const updateUserProfile = (displayName, photoURL) => {
        return updateProfile(auth.currentUser, { displayName, photoURL });
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Logged Out!",
                    text: "You have been successfully logged out.",
                    timer: 1500,
                    showConfirmButton: false,
                });
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Logout Failed",
                    text: err.message,
                });
            })
            .finally(() => setLoading(false));
    }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
            try {
                const res = await axios.get(`http://localhost:3000/user/${currentUser.email}`);
                const backendUser = res.data;
                setUser({ 
                    ...currentUser, 
                    role: backendUser?.role || "user" 
                });
            } catch (err) {
                console.error(err);
                setUser(currentUser);
            }
        } else {
            setUser(null);
        }
        setLoading(false);
    });

    return () => unsubscribe();
}, []);



    const authInfo = {
        createUser,
        updateUserProfile,
        signInUser,
        signInWithGoogle,
        signOutUser,
        user,
        loading,
        setLoading
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
