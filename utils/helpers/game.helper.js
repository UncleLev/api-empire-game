const Game = require('../../models/gameModel');

const CODE_LENGTH = 6;

const generateString = (length) => {
    const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = CHARACTERS.length;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
        result += CHARACTERS.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
};

exports.createInviteCode = async () => {
    const gameCodes = await Game.find({ inviteCode: { $ne: null } }).select('inviteCode');
    let notUniq = true;
    let code = '';

    while (notUniq) {
        code = generateString(CODE_LENGTH);
        notUniq = gameCodes.includes(code);
    }

    return code;
};
