import uuid from 'react-native-uuid';

// Generate a unique user session ID
export const generateUserSessionId = () => {
  const deviceId = uuid.v4(); // Generate a unique device identifier (UUID)
  const timestamp = Date.now(); // Get the current timestamp
  console.log(deviceId, timestamp);
  return `${deviceId}_${timestamp}`;
};

// Retrieve user session ID from AsyncStorage

// // Example usage
// const userSessionId = generateUserSessionId();
// saveUserSessionIdToStorage(userSessionId);

// // Later in the code or in another component
// const retrievedUserSessionId = await getUserSessionIdFromStorage();
// console.log('Retrieved User Session ID:', retrievedUserSessionId);
