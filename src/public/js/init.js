var commonUrl = {
    media: {
        url: 'https://media.fmplustest.xyz',
        connector: '/el-finder-file-system/connector',
        cdn: ''
    }
};

window.addEventListener('updateSettings', (event) => {
    commonUrl.media.cdn = event.detail.Cdn;
    commonUrl.media.connector = event.detail.MediaConnector;
    commonUrl.media.url = event.detail.MediaUrl;
});