import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback, Spinner } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom'
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from '../Firebase';

class SignInOrUp extends React.Component {

    state = {
        loading: false, //spinner制御用
    }

    _isMounted = false;

    handleOnSubmit = (values) => {
        //spinner表示開始
        if (this._isMounted) this.setState({ loading: true })
        //サインイン（ログイン）処理
        firebase.auth().signInWithEmailAndPassword(values.email, values.password)
            .then(res => {
                //正常終了時
                this.props.history.push("/");
                if (this._isMounted) this.setState({ loading: false });
            })
            .catch(error => {
                //異常終了時
                if (this._isMounted) this.setState({ loading: false });
                function errorMessage(error) {
                    switch (error.code) {
                        case 'auth/cancelled-popup-request':
                        case 'auth/popup-closed-by-user':
                            return null;
                        case 'auth/email-already-in-use':
                            return 'メールアドレスまたはパスワードが違います';
                        case 'auth/invalid-email':
                            return 'メールアドレスの形式が正しくありません';
                        case 'auth/user-disabled':
                            return 'サービスの利用が停止されています';
                        case 'auth/user-not-found':
                            return 'メールアドレスまたはパスワードが違います';
                        case 'auth/user-mismatch':
                            return 'メールアドレスまたはパスワードが違います';
                        case 'auth/weak-password':
                            return 'パスワードは6文字以上にしてください';
                        case 'auth/wrong-password':
                            return 'メールアドレスまたはパスワードが違います';
                        case 'auth/popup-blocked':
                            return '認証ポップアップがブロックされました。ポップアップブロックをご利用の場合は設定を解除してください';
                        case 'auth/operation-not-supported-in-this-environment':
                        case 'auth/auth-domain-config-required':
                        case 'auth/operation-not-allowed':
                        case 'auth/unauthorized-domain':
                            return '現在この認証方法はご利用頂けません';
                        case 'auth/requires-recent-login':
                            return '認証の有効期限が切れています';
                        default:
                            return 'エラーが発生しました。しばらく時間をおいてお試しください';
                    }
                }
                // alert(errorMessage(error));
                console.log(error)
            });

    }

    componentDidMount = () => {
        this._isMounted = true;
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    render() {
        return (
            <div className="container">
                <div className="mx-auto" style={{ width: 400, background: '#eee', padding: 20, marginTop: 60 }}>
                    <p style={{ textAlign: 'center' }}>サインイン</p>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values) => this.handleOnSubmit(values)}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email().required(),
                            password: Yup.string().required(),
                        })}
                    >
                        {
                            ({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            invalid={touched.email && errors.email ? true : false}
                                        />
                                        <FormFeedback>
                                            {errors.email}
                                        </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Input
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            invalid={touched.password && errors.password ? true : false}
                                        />
                                        <FormFeedback>
                                            {errors.password}
                                        </FormFeedback>
                                    </FormGroup>
                                    <div style={{ textAlign: 'center' }}>
                                        <Button color="primary" type="submit" disabled={this.state.loading}>
                                            <Spinner size="sm" color="light" style={{ marginRight: 5 }} hidden={!this.state.loading} />
                                            ログイン
                                        </Button>
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
                <div className="mx-auto" style={{ width: 400, background: '#fff', padding: 20 }}>
                    <Link to="/signup">新規登録はこちら。</Link>
                </div>
            </div>
        );
    }
}

export default withRouter(SignInOrUp);