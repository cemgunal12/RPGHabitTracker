import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Dimensions
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';
import { COLORS, FONTS } from '../constants/theme';

const { width, height } = Dimensions.get('window');

export default function SignUp({ onSignUp, onNavigateToLogin }) {
    // Form State
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Error State
    const [error, setError] = useState('');

    // Focus State - For neon effect
    const [userFocus, setUserFocus] = useState(false);
    const [passFocus, setPassFocus] = useState(false);
    const [confirmFocus, setConfirmFocus] = useState(false);

    const handleSubmit = () => {
        setError('');

        // Password Match Check
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Password Length Check
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (username && password) {
            onSignUp(username, password);
        }
    };

    return (
        <View style={styles.container}>
            {/* 1. BACKGROUND PATTERNS (Same as Login) */}
            <View style={styles.backgroundPattern}>
                <View style={[styles.geoShape, { top: 40, left: 40, width: 80, height: 80, borderColor: COLORS.primary, transform: [{ rotate: '45deg' }] }]} />
                <View style={[styles.geoShape, { top: 150, right: -20, width: 60, height: 60, borderColor: COLORS.secondary, transform: [{ rotate: '12deg' }] }]} />
                <View style={[styles.geoShape, { bottom: 80, left: '20%', width: 100, height: 100, borderColor: COLORS.primary, transform: [{ rotate: '45deg' }] }]} />

                <View style={styles.svgContainer}>
                    <Svg height="100%" width="100%" viewBox="0 0 200 200">
                        <Path
                            d="M100,20 L120,80 L180,80 L130,120 L150,180 L100,140 L50,180 L70,120 L20,80 L80,80 Z"
                            stroke={COLORS.primary} strokeWidth="1" fill="none" opacity="0.3"
                        />
                        <Circle cx="100" cy="100" r="70" stroke={COLORS.secondary} strokeWidth="1" fill="none" strokeDasharray="5,5" opacity="0.3" />
                    </Svg>
                </View>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>

                    {/* 2. SIGN UP CARD */}
                    <View style={styles.cardContainer}>
                        {/* Glow Effect */}
                        <LinearGradient
                            colors={[COLORS.primary, COLORS.secondary]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.glowEffect}
                        />

                        <View style={styles.cardContent}>

                            {/* Header */}
                            <View style={styles.headerSection}>
                                <View style={styles.iconRow}>
                                    <MaterialCommunityIcons name="creation" size={32} color={COLORS.primary} />
                                    <MaterialCommunityIcons name="shield-outline" size={32} color={COLORS.secondary} />
                                </View>
                                <Text style={styles.title}>JOIN THE QUEST</Text>
                                <Text style={styles.subtitle}>Create your adventurer profile</Text>
                            </View>

                            {/* Form */}
                            <View style={styles.formSection}>

                                {/* Username */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Username</Text>
                                    <TextInput
                                        style={[styles.input, userFocus && styles.inputFocused]}
                                        placeholder="Choose your adventurer name"
                                        placeholderTextColor={COLORS.mutedForeground}
                                        value={username}
                                        onChangeText={setUsername}
                                        onFocus={() => setUserFocus(true)}
                                        onBlur={() => setUserFocus(false)}
                                        autoCapitalize="none"
                                    />
                                </View>

                                {/* Password */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Password</Text>
                                    <View style={styles.passwordContainer}>
                                        <TextInput
                                            style={[styles.input, passFocus && styles.inputFocused, { paddingRight: 50 }]}
                                            placeholder="Create a strong password"
                                            placeholderTextColor={COLORS.mutedForeground}
                                            value={password}
                                            onChangeText={setPassword}
                                            secureTextEntry={!showPassword}
                                            onFocus={() => setPassFocus(true)}
                                            onBlur={() => setPassFocus(false)}
                                        />
                                        <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                                            <MaterialCommunityIcons name={showPassword ? "eye-off" : "eye"} size={24} color={COLORS.mutedForeground} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Confirm Password */}
                                <View style={styles.inputGroup}>
                                    <Text style={styles.label}>Confirm Password</Text>
                                    <View style={styles.passwordContainer}>
                                        <TextInput
                                            style={[styles.input, confirmFocus && styles.inputFocused, { paddingRight: 50 }]}
                                            placeholder="Confirm your password"
                                            placeholderTextColor={COLORS.mutedForeground}
                                            value={confirmPassword}
                                            onChangeText={setConfirmPassword}
                                            secureTextEntry={!showConfirmPassword}
                                            onFocus={() => setConfirmFocus(true)}
                                            onBlur={() => setConfirmFocus(false)}
                                        />
                                        <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                            <MaterialCommunityIcons name={showConfirmPassword ? "eye-off" : "eye"} size={24} color={COLORS.mutedForeground} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Error Message */}
                                {error ? (
                                    <View style={styles.errorContainer}>
                                        <Text style={styles.errorText}>{error}</Text>
                                    </View>
                                ) : null}

                                {/* Sign Up Button */}
                                <TouchableOpacity onPress={handleSubmit} activeOpacity={0.8}>
                                    <LinearGradient
                                        colors={[COLORS.primary, '#9D4EDD']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.signupButton}
                                    >
                                        <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                {/* Divider */}
                                <View style={styles.dividerContainer}>
                                    <View style={styles.dividerLine} />
                                    <Text style={styles.dividerText}>or</Text>
                                </View>

                                {/* Login Link */}
                                <View style={styles.footer}>
                                    <Text style={styles.footerText}>Already have an account? </Text>
                                    <TouchableOpacity onPress={onNavigateToLogin}>
                                        <Text style={styles.loginLink}>Log In</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    backgroundPattern: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.1,
        zIndex: -1,
    },
    geoShape: {
        position: 'absolute',
        borderWidth: 2,
    },
    svgContainer: {
        position: 'absolute',
        top: height / 2 - 150,
        left: width / 2 - 150,
        width: 300,
        height: 300,
        opacity: 0.5,
    },
    // CARD
    cardContainer: {
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
    },
    glowEffect: {
        position: 'absolute',
        top: -2, left: -2, right: -2, bottom: -2,
        borderRadius: 20,
        opacity: 0.5,
    },
    cardContent: {
        backgroundColor: COLORS.card,
        borderRadius: 18,
        padding: 30,
        borderWidth: 1,
        borderColor: 'rgba(138, 43, 226, 0.3)',
    },
    // HEADER
    headerSection: {
        alignItems: 'center',
        marginBottom: 25,
    },
    iconRow: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
        color: COLORS.foreground,
        fontFamily: FONTS.bold,
        letterSpacing: 2,
        textAlign: 'center',
    },
    subtitle: {
        color: COLORS.mutedForeground,
        fontSize: 14,
        marginTop: 5,
    },
    // FORM
    formSection: {
        gap: 15,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        color: COLORS.mutedForeground,
        fontSize: 14,
        fontWeight: '500',
    },
    passwordContainer: {
        position: 'relative',
    },
    input: {
        backgroundColor: COLORS.inputBackground,
        color: COLORS.foreground,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#3A3A3A',
        fontSize: 16,
    },
    inputFocused: {
        borderColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 5,
    },
    eyeIcon: {
        position: 'absolute',
        right: 16,
        top: 12,
    },
    // ERROR MESSAGE
    errorContainer: {
        backgroundColor: 'rgba(255, 23, 68, 0.1)',
        borderColor: 'rgba(255, 23, 68, 0.3)',
        borderWidth: 1,
        borderRadius: 12,
        padding: 10,
    },
    errorText: {
        color: '#ff4d4d',
        fontSize: 14,
        textAlign: 'center',
    },
    // BUTTONS
    signupButton: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 5,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: FONTS.bold,
    },
    // DIVIDER & FOOTER
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    dividerLine: {
        flex: 1, height: 1, backgroundColor: '#3A3A3A',
    },
    dividerText: {
        color: '#606060', paddingHorizontal: 16, fontSize: 14,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerText: {
        color: COLORS.mutedForeground, fontSize: 14,
    },
    loginLink: {
        color: COLORS.secondary,
        fontWeight: 'bold',
        fontSize: 14,
    },
});