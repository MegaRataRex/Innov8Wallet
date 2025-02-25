import { StyleSheet } from 'react-native';

export const colors = {
    red: '#e30027',
    orange: '#eb750a',
    dark_red: '#4A0000',

    background: 'ghostwhite',
    main_text: 'black',
};


export const styles = StyleSheet.create({
    background:{
        flex: 1,
        backgroundColor: colors.background,
    },
    container:{
        backgroundColor: 'white',
        borderRadius: 16, // Rounded corners
        padding: 16,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Android shadow
        flexShrink: 1,
    },
});
