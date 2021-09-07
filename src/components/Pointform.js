import React, { useEffect, useState } from "react";
import { app, fireDB } from "../base";
import { UserGroupList02 } from "./UserDataList";
import { UserDataList } from "./UserDataList";

const Pointform = (props) => {
    let index = 0
    const [myPoint, setMyPoint] = useState(0)
    const [userPoint, setUserPoint] = useState(0)
    const [userUid, setUserUid] = useState('')
    const [comment, setComment] = useState('')
    const [passPoint, setPassPoint] = useState(0)
    const [msg, setMsg] = useState('選択してください')

    useEffect(() => {
        fireDB.ref(props.selfUid).once("value", function (obj) {
            setMyPoint(obj.val().point)
        })
    });


    const changeSelect = (e) => {
        let newValue = e.target.value
        setMsg('送信待機中')
        setUserUid(newValue)
        fireDB.ref(e.target.value).once("value", function (obj) {
            setUserPoint(obj.val().point)
        })
    }
    const changeNumber = (e) => {
        let newValue = Number(e.target.value)
        setMsg('送信待機中')
        setPassPoint(newValue)
    }

    const changeComment = (e) => {
        let newValue = String(e.target.value)
        setMsg('送信待機中')
        console.log(newValue)
        setComment(newValue)
    }

    const submitDB = (e) => {
        e.preventDefault()
        if (myPoint !== 0 && userUid !== '' && comment !== '' && Number(myPoint) >= Number(passPoint)) {
            //時間取得
            let d = new Date()
            let f = d.getFullYear() + '-' + (d.getMonth() + 1)

            //commentのindex数を数える
            let firebase_node = fireDB.ref('/commentData/' + f);
            firebase_node.once('value', parent => {
                index = parent.numChildren()
                let commentItem = 'commentItem' + (index + 1)
                console.log(commentItem)

                //自分のポイント（現在持っているポイント-渡すポイント ）
                let selfPoint = Number(myPoint) - passPoint
                //渡した相手のポイント（相手のポイント+渡すポイント）
                let pushPoint = Number(userPoint) + passPoint

                //DBの送り先をセット
                let selfPointRef = fireDB.ref(props.selfUid)
                let passPointRef = fireDB.ref(userUid)
                let commentRef = fireDB.ref('/commentData/' + f + '/' + commentItem + '/')
                try {
                    selfPointRef.set({ point: selfPoint })
                    passPointRef.set({ point: pushPoint })
                    commentRef.set({
                        'from': props.selfUid,
                        'to': userUid,
                        'point': passPoint,
                        'value': comment
                    })
                    pushPoint = 0
                    selfPoint = 0
                    // setMyPoint(selfPoint)
                    setMsg('送信完了')
                    setTimeout(() => {
                        window.location.reload()
                    }, 500)

                } catch (error) {
                    console.log(error)
                }
            })
        } else {
            console.log(`userPoint${userPoint} myPoint${myPoint} passPoint${passPoint}`);
            window.alert('選択されていないかor渡すポイントが足りません')
        }
    }

    const userList = () => {
        const userData = UserDataList.slice()
        //ログイン中の配列番号を取得
        const delTargetUid = userData.findIndex(({ uid }) => uid === props.selfUid)
        //配列番号を削除
        userData.splice(delTargetUid, 1)
        //営業だけリストから削除
        const newUserList = userData.filter((val) => {
            return !UserGroupList02.includes(val)
        })

        let userItems = newUserList.map((user, index) => (
            <option key={index} value={user.uid}>{user.name}</option>
        ))
        return userItems
    }


    return (
        <>
            <form onSubmit={submitDB} className="pointForm">
                <select onChange={changeSelect}>
                    <option value='-' style={{ display: 'none' }}>送りたい相手を選択</option>
                    {userList()}
                </select>
                <input type="number" min='1' onChange={changeNumber} placeholder="送るpcを記入" />
                <textarea cols="30" rows="10" value={comment} onChange={changeComment} placeholder="コメントを残す"></textarea>
                <input type="submit" />
            </form>
            <p>{msg}</p>
        </>
    )
}


export default Pointform;