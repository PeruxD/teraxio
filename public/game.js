let web3;
let contract;
let playerAddress;

const contractAddress = "DIRECCION_DEL_CONTRATO";  // Reemplaza con la dirección del contrato desplegado
const abi = [
    {
        "inputs": [],
        "name": "register",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "levelUp",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_player",
                "type": "address"
            }
        ],
        "name": "getLevel",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "players",
        "outputs": [
            {
                "internalType": "address",
                "name": "playerAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "level",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const init = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        playerAddress = accounts[0];
        contract = new web3.eth.Contract(abi, contractAddress);
    } else {
        alert("Please install MetaMask!");
    }
};

const registerPlayer = async () => {
    await contract.methods.register().send({ from: playerAddress });
};

const getPlayerLevel = async () => {
    const level = await contract.methods.getLevel(playerAddress).call();
    console.log(`Player level: ${level}`);
};

window.onload = () => {
    init();
    document.getElementById('registerButton').onclick = registerPlayer;
};
