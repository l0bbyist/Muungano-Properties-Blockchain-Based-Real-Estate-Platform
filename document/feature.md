# Owner:
1. Register an account, log in  
2. View the status and details of their real estate properties  
3. Activate registered assets from the government and transfer ownership documents  
4. Conduct real estate transactions  
5. Lookup information  

# Government:
1. Digitize ownership certificates and upload them to the blockchain  
2. Transfer ownership tokens to users via the provided public address  
3. Include the owner  

# Notary:
1. Participate in transactions between two users  

# Transaction Process:
1. The seller and co-owners set the deposit amount, transfer amount, and bank account, then publish the property for sale.  
2. The buyer invites the seller and notary to the transaction.  
3. The buyer and notary agree to participate in the transaction.  
4. All three parties digitally sign contracts and confirm each signature via OTP (review this step).  
5. The buyer transfers the deposit and uploads the invoice, the seller confirms receipt, and the notary verifies that both parties have completed their obligations.  
6. The buyer or seller pays taxes to the government and uploads the receipt for confirmation by both parties.  
7. The payment stage follows the same process as the deposit.  
8. Ownership tokens are transferred and recorded on the blockchain, with a link to check the transaction on the blockchain explorer.  

# Schema Transaction:
{
  "buyer": [user],
  "seller": [user],
  "Notary": user,
  "invite": {
    "accept": [user],
    "status": boolean
  },
  "contract": "string",
  "deposits": {
    "status": boolean,
    "amount": number,
    "invoice": "string"
  },
  "pay_taxes": {
    "status": boolean,
    "amount": number,
    "invoice": "string"
  },
  "payment": {
    "status": boolean,
    "amount": number,
    "invoice": "string"
  },
  "link_check_contract": "string",
  "status": boolean
}
