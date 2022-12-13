const EMAIL = {
	is_valid: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
};

const PASSWORD = {
    min: 8
};


function getRandomId () {
    return `id-${Date.now() + Math.random().toString(16).slice(2)}`;
}