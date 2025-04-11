pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;  // Add this line to enable the experimental ABI encoder

/**
 * @title RoleBasedAcl (Roles-based access control)
 * @dev Contract managing addressed role based access control
 */
contract RoleBasedAcl {
    enum Roles {SUPER_ADMIN, NOTARY, LAST_INDEX} //SUPER_ADMIN: 0, NOTARY: 1, LAST: number value of enum
    mapping(address => mapping(uint8 => bool)) roles; //address => Role(uint8) => bool
    // For read all user role in contract
    address[] public userAddress;
    mapping(address => bool) public isUserAdded;
    // event add and remove role
    event RoleAdded(address indexed account, Roles role);
    event RoleRemoved(address indexed account, Roles role);
    
    constructor() public {
        roles[msg.sender][0] = true; // set deployer is 'superadmin'
        userAddress.push(msg.sender);
        isUserAdded[msg.sender] = true;
    }
    
    /**
     * @notice Assign a role to address
     * @dev require msg.sender is superadmin
     * @param _account address
     * @param _role the name of the role
     */
    function addRole(address _account, Roles _role)
        external
        onlyRole(0)
    {
        // Check if the account already has this specific role
        require(!hasRole(_account, uint8(_role)), "Roles: Account already has this role");
        
        // Add the role
        roles[_account][uint8(_role)] = true;
        
        // Add to userAddress array if not already added
        if (!isUserAdded[_account]) {
            userAddress.push(_account);
            isUserAdded[_account] = true;
        }
        
        emit RoleAdded(_account, _role);
    }
    
    /**
     * @notice remove a role from an address
     * @dev require msg.sender = superadmin
     * @param _account address
     * @param _role the name of the role
     */
    function removeRole(address _account, Roles _role) external onlyRole(0) {
        // Prevent removing SUPER_ADMIN from msg.sender
        if (_role == Roles.SUPER_ADMIN && _account == msg.sender) {
            revert("Roles: Unable to remove superadmin role itself");
        }
        
        require(
            hasRole(_account, uint8(_role)),
            "Roles: Account doesn't have role"
        );
        
        roles[_account][uint8(_role)] = false;
        
        // Check if address has any roles left
        bool hasAnyRole = false;
        uint256 amountRoles = uint8(Roles.LAST_INDEX);
        for (uint8 i = 0; i < amountRoles; i++) {
            if (roles[_account][i]) {
                hasAnyRole = true;
                break;
            }
        }
        
        // If no roles left, remove from userAddress array
        if (!hasAnyRole) {
            removeFromUserArray(_account);
            isUserAdded[_account] = false;
        }
        
        emit RoleRemoved(_account, _role);
    }
    
    /**
     * @dev Helper function to remove an address from the userAddress array
     * @param _account address to remove
     */
    function removeFromUserArray(address _account) internal {
        uint256 length = userAddress.length;
        for (uint256 i = 0; i < length; i++) {
            if (userAddress[i] == _account) {
                // Swap with the last element and then pop
                if (i < length - 1) {
                    userAddress[i] = userAddress[length - 1];
                }
                userAddress.pop();
                break;
            }
        }
    }
    
    /**
     * @dev determine if addr has role
     * @param _account address
     * @param _role the name of the role
     * @return bool
     */
    function hasRole(address _account, uint8 _role) public view returns (bool) {
        require(_account != address(0), "Roles: account is the zero address");
        return roles[_account][_role];
    }
    
    /**
     * @dev modifier to scope access to a single role (uses msg.sender as addr)
     * @param _role the name of the role
     */
    modifier onlyRole(uint8 _role) {
        require(hasRole(msg.sender, _role), "Roles: Account not allowed");
        _;
    }
    
    /**
     * @notice Get list user and all their roles
     * @return address[], uint8[][] Each user can have multiple roles
     */
    function getAllAddressAndRoles()
        external
        view
        returns (address[] memory, uint8[][] memory)
    {
        uint256 userCount = userAddress.length;
        uint8[][] memory allRoles = new uint8[][](userCount);
        
        for (uint256 i = 0; i < userCount; i++) {
            address userAddr = userAddress[i];
            
            // Count how many roles this user has
            uint256 roleCount = 0;
            for (uint8 r = 0; r < uint8(Roles.LAST_INDEX); r++) {
                if (roles[userAddr][r]) {
                    roleCount++;
                }
            }
            
            // Create array for this user's roles
            allRoles[i] = new uint8[](roleCount);
            
            // Fill the array with the roles
            uint256 index = 0;
            for (uint8 r = 0; r < uint8(Roles.LAST_INDEX); r++) {
                if (roles[userAddr][r]) {
                    allRoles[i][index] = r;
                    index++;
                }
            }
        }
        
        return (userAddress, allRoles);
    }
    
    /**
     * @notice Get list user and primary role (for backward compatibility)
     * @return address[], uint8[]
     */
    function getAllAddressAndRole()
        external
        view
        returns (address[] memory, uint8[] memory)
    {
        uint8[] memory listRole = new uint8[](userAddress.length);
        uint256 amountRoles = uint8(Roles.LAST_INDEX);
        
        for (uint8 i = 0; i < userAddress.length; i++) {
            for (uint8 j = 0; j < amountRoles; j++) {
                // Return the first role found for each user
                if (roles[userAddress[i]][j]) {
                    listRole[i] = j;
                    break;
                }
            }
        }
        return (userAddress, listRole);
    }
}