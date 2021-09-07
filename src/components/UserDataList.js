
export const UserGroupList01 = [
    { name: 'testUser01', uid: '7Ug7qg0PR7VOQqi758ELspQpZ4z1' },
    { name: 'testUser02', uid: 'JF8jCi8CaCXKMkK63wK15vxDlkA2' },
    { name: 'testUser03', uid: 'PUrp5Kjv7eTOQm3FounZArcuoqC3' },
]
export const UserGroupList02 = [
    { name: 'testUser04', uid: 'NL2HkxXqeLWPR3EH2heUoj8HPi23' },
    { name: 'testUser05', uid: 'dxTGtrLoKiT6pJi5NcOOMu5zBL42' },
    { name: 'testUser06', uid: 'qghSK8IufUfvbWAtlZpwlOm9ZSx1' }
]


export const UserDataList = [...UserGroupList01, ...UserGroupList02]

export const searchUser = (targetUid) => {
    let returnName = ''
    UserDataList.forEach((value) => {
        if (targetUid === value.uid) {
            // console.log("OK")
            returnName = value.name
        } else {
            ;
        }
    })
    return returnName
}

