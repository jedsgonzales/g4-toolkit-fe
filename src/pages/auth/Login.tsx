import { Form, FormikProvider, useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
// icons
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// material
import { LoadingButton } from "@mui/lab";
import {
    Alert,
    Box,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputAdornment,
    Link,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// redux
import * as crypto from "crypto";
import { useDispatch, useSelector } from "react-redux";
import { authKey, authLogin } from "src/redux/authSlice";
import { SmartG4Dispatch, SmartG4RootState } from "src/redux/store";

// ----------------------------------------------------------------------
const ContentStyle = styled("div")(() => ({
    maxWidth: 480,
    margin: "auto",
    display: "flex",
    minHeight: "80vh",
    flexDirection: "column",
    justifyContent: "center",
    //padding: theme.spacing(1, 0)
}));
// ----------------------------------------------------------------------

interface Values {
    username: string;
    password: string;
    remember: boolean;
}

const initialValues: Values = {
    username: localStorage.remember === "true" ? localStorage.username : "",
    password: localStorage.remember === "true" ? localStorage.password : "",
    remember: localStorage.remember === "true" ? true : false,
    //recaptcha: '',
};

const validationSchema = Yup.object({
    username: Yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters"),
    password: Yup.string().required("Password is required"),
});

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch<SmartG4Dispatch>();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    //const isMountedRef = useIsMountedRef()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const auth = useSelector((state: SmartG4RootState) => state.auth);

    //console.log(auth)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values: Values, { setSubmitting }) => {
            let maskedPass: string = values.password;

            if (!!auth.data?.key && !!values.username && !!values.password) {
                // perform password obfuscation routine
                const sha256 = crypto.createHash("sha256");
                sha256.update(values.password);
                maskedPass = sha256.digest("hex");

                const md5 = crypto.createHash("md5");
                md5.update(`${maskedPass}${auth.data?.key}`);
                maskedPass = md5.digest("hex");

                if (values.remember) {
                    localStorage.username = values.username;
                    localStorage.password = values.password;
                    localStorage.remember = values.remember;
                }
            } else {
                localStorage.username = "";
                localStorage.password = "";
                localStorage.remember = false;
            }

            try {
                await dispatch(authLogin({ ...values, password: maskedPass }));
                //await dispatch(authValidate({}))
                //await dispatch(userRead({ id: user.id }))

                enqueueSnackbar("Login success", {
                    variant: "success",
                    action: (key) => (
                        <IconButton size="small" onClick={() => closeSnackbar(key)}>
                            <CloseIcon />
                        </IconButton>
                    ),
                });
                //if (isMountedRef.current) {
                setSubmitting(false);
                //}
            } catch (error: unknown) {
                console.log(error);
                //if (isMountedRef.current) {
                //  setErrors({ afterSubmit: error.message })
                setSubmitting(false);
                if (typeof error === "string") {
                    enqueueSnackbar(error, {
                        variant: 'error',
                        action: (key) => (
                            <IconButton size="small" onClick={() => closeSnackbar(key)}>
                                <CloseIcon />
                            </IconButton>
                        )
                    })
                } else if (error instanceof Error) {
                    enqueueSnackbar(error.message, {
                        variant: 'error',
                        action: (key) => (
                            <IconButton size="small" onClick={() => closeSnackbar(key)}>
                                <CloseIcon />
                            </IconButton>
                        )
                    })
                }
                //}
            }
        },
    });

    const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps } =
        formik;

    useEffect(() => {
        if (!auth.data?.token) {
            return;
        }

        if (
            auth.data?.roles?.find((r) => r.RoleName === "Admin") &&
            !pathname.includes("/admin/")
        ) {
            console.log("move to admin dashboard");
            navigate("/admin", { replace: true });
        } else if (
            auth.data?.roles?.find((r) => r.RoleName === "Staff") &&
            !pathname.includes("/user/")
        ) {
            console.log("move to user dashboard");
            navigate("/user", { replace: true });
        }
    }, [navigate, auth.data, pathname]);

    const getLoginKey = async () => {
        await dispatch(authKey(values.username));
    };

    return (
        <Container maxWidth="sm">
            <ContentStyle>
                <Stack sx={{ mb: 5 }}>
                    <Typography variant="h4" gutterBottom>
                        Sign in
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                        Enter your details below.
                    </Typography>
                </Stack>

                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                autoComplete="username"
                                label="Username"
                                {...getFieldProps("username")}
                                error={Boolean(touched.username && errors.username)}
                                helperText={touched.username && errors.username}
                                disabled={isSubmitting}
                            />
                            {!!auth.data?.key && (
                                <TextField
                                    fullWidth
                                    autoComplete="password"
                                    type={showPassword ? "text" : "password"}
                                    label="Password"
                                    {...getFieldProps("password")}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    edge="end"
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    error={Boolean(touched.password && errors.password)}
                                    helperText={touched.password && errors.password}
                                    disabled={isSubmitting || auth.loading || !auth.data?.key}
                                />
                            )}

                            <FormControl
                                required
                                error={Boolean(touched.remember && errors.remember)}
                                component="fieldset"
                                sx={{ m: 3 }}
                                variant="standard"
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            {...getFieldProps("remember")}
                                            checked={values.remember}
                                        />
                                    }
                                    label="Remember me"
                                />
                                <FormHelperText>
                                    {touched.remember && errors.remember}
                                </FormHelperText>
                            </FormControl>
                            {auth.error && <Alert severity="error">{auth.error}</Alert>}

                            {auth.data?.key ? (
                                <Box
                                    sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
                                >
                                    <LoadingButton
                                        color="primary"
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        loading={isSubmitting}
                                    >
                                        Login
                                    </LoadingButton>
                                </Box>
                            ) : (
                                <Box
                                    sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
                                >
                                    <LoadingButton
                                        color="primary"
                                        fullWidth
                                        size="large"
                                        type="button"
                                        variant="contained"
                                        loading={auth.loading}
                                        onClick={getLoginKey}
                                    >
                                        Next
                                    </LoadingButton>
                                </Box>
                            )}

                            <Link variant="subtitle2" component={RouterLink} to="/">
                                Go Home
                            </Link>
                        </Stack>
                    </Form>
                </FormikProvider>
            </ContentStyle>
        </Container>
    );
}
