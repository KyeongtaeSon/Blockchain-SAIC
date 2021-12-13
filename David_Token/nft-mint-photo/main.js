////// ETHEREUM SETUP //////


ethereum.autoRefreshOnNetworkChange = false;
window.ethereum.enable();
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// swap this address out with the contract address for your token (found in Remix after deploying)
const contractAddress = "0xbF19BD48A9a2F7f4f5e091dfAcff488244c6F526";
const contractABI = [
    "function balanceOf(address account) public view returns (uint256)",
    "function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)",
    "function totalSupply() public view returns (uint256)",
    "function tokenByIndex(uint256 index) public view returns (uint256)",
    "function mintPhoto(string tokenURI) public",
    "function tokenURI(uint256 tokenId) public view returns (string)"
  ];
const contract = new ethers.Contract(contractAddress, contractABI, provider);
const tokenWithSigner = contract.connect(signer);


////// END ETHEREUM SETUP

main();

async function main() {

  let address = await signer.getAddress();
  $('.address').text(`Connected wallet: ${address}`);

  // when the user clicks on an image in the gallery...
  $('.gallery img').click(function() {
   
    // extract the filepath of the image that was clicked (img src)
    // e.g. https://yourusername.github.io/photo-project/img/1.jpg

    


    const imgFilePath = $(this)[0].src;

    // split the filepath based on "/"
    const imgFilePathSplit = imgFilePath.split("/");

    // extract the filename from the filepath
    // e.g. "1.jpg"
    const imgFileName = imgFilePathSplit[imgFilePathSplit.length-1];

    // display the filename of the image to be minted
    $('.info').text(`File to mint: ${imgFileName}`)


    // show alert messages (or don't...)
    errorMessage = false; // SET THIS TO 'false' TO BLOCK THE ALERT MESSAGES
    if(errorMessage == true) {
      alerts();
    }
    
    // initiate the transaction to mint an NFT that passes the URL of the
    // photo that was clicked as the tokenURI to the NFT, so that the NFT
    // points to the image file.
    tokenWithSigner.mintPhoto(imgFilePath);
  })
}

// These alerts will appear if you try to mint an NFT while testing your code in Live Server
function alerts() {
  if(window.location.href[4] == ":" && errorMessage == true) {
    alert("If you are reading this, you are currently testing out your code, and  should not approve the MetaMask transaction that appears when you close these dialog boxes.")
    
    alert(`If you approve the MetaMask transaction that appears after you close this dialog box, the link to the image in the NFT you mint will look a bit like this: "http://127.0.0.1:5500/img/1.jpg" ... this link only works locally, and will not be publicly viewable.`)

    alert(`Feel free to block these alerts so they don't appear every time you try to test your code. Just be aware that MINTING NFTs WHILE USING LIVE SERVER will result in NFTs with inaccessible images.`)

    alert(`(You can block these alerts in the main.js file)`)
  }
}