ethereum.autoRefreshOnNetworkChange = false;
ethereum.enable();

const provider = new ethers.providers.Web3Provider(window.ethereum);
let signer = provider.getSigner();
const contractAddress = "0x1214E9d9b5220b19121AD356b91FeCC401970362"; // insert your contract address here
const contractABI = [
  "function changeStatus() public",
  "function viewStatus() public view returns (string memory)"
];

const contract = new ethers.Contract(contractAddress, contractABI, provider);
const tokenWithSigner = contract.connect(signer);


// executes the status change upon clicking the button
$('.change-status').click(changeStatus)

// reads and displays the contract's art status directly from the blockchain
viewStatus();

// an asynchrononous function to view the art status of the contract
async function viewStatus() {
    let status = await contract.viewStatus();

    $('.is-art').text(`${status}`);
    // console.log(status);
}

// Change the status of the contract between "is not art" and "is art"
async function changeStatus() {
    tokenWithSigner.changeStatus();
}

// a not so elegant but totally functioning way to automatically
// update the displayed status of the contract after changing it
setInterval(function(){
    viewStatus();
    // console.log("checking...")
}, 2000);