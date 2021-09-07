import React, { useEffect, useState } from "react";
import { app, fireDB } from "../base";
import "firebase/auth";
import { UserDataList, searchUser } from "./UserDataList";

const Distribute = (props) => {
    const [UserData, setUserData] = useState(UserDataList)
    const [targetUser, setTergetUser] = useState('')
    const [distributePoint, setDistributePoint] = useState(0)
    const doSubmit = (e) => {
        e.preventDefault()
        if (targetUser !== '') {
            let selectUserTable = fireDB.ref('/' + targetUser + '/');
            selectUserTable.set({ point: Number(distributePoint) }, (error) => {
                if (error) {
                    console.log("DBエラー")
                } else {
                    console.log("成功！")
                }
            })
            window.alert(searchUser(targetUser) + 'を' + distributePoint + 'ポイントにしました')

        } else {
            window.alert('ユーザーを選択してください')
        }
    }
    const doChangeUID = (e) => {
        let selectUser = e.target.value
        setTergetUser(selectUser)
    }
    const doChangeDistributePoint = (e) => {
        let selectPoint = e.target.value
        setDistributePoint(selectPoint)
        // console.log(selectPoint)
    }


    const userList = UserData.map((value, index) => (<option key={index} value={value.uid}>{value.name}</option>))



    return (
        <>
            <p>ポイント付与</p>
            <div className="textBox">
                <p>ここでポイントを付与することができます。<br/>セレクトボックスで対象者を選択後、付与するポイント数を入力し「送信」を押してください。<br />（現在残っているポイントは削除されます）</p>
            </div>
            <form onSubmit={doSubmit} className="pointForm">
                <select onChange={doChangeUID}>
                    <option value="">-</option>
                    {userList}
                </select>
                <input type="number" min='0' onChange={doChangeDistributePoint} />
                <input type="submit" />
            </form>
        </>
    )
}

export default Distribute