import UserLayout from "./userLayout";
import AdminLayout from "./adminLayout";
import {useRouter} from "next/router";
import Button from "@mui/material/Button";

const layouts = {
    user: UserLayout,
    admin: AdminLayout
};

const NotFound = (props) => {
    const router = useRouter();
    return (
        <div>
            <Button onClick={() => router.back()} color={"primary"}>GoBack</Button>
            {props.children}
        </div>
    );
}

const LayoutWrapper = (props) => {
    const router = useRouter();
    // to get the text value of the assigned layout of each component
    const Layout = layouts[props.children.type.layout];
    // if we have a registered layout render children with said layout
    if (Layout != null) {
        return <Layout {...props}>{props.children}</Layout>;
    }
    // if not render children with fragment
    return <div {...props}>{props.children}</div>/*<UserLayout {...props}>{props.children}</UserLayout>;*/ /*<NotFound {...props}/>*/

};

export default LayoutWrapper;
