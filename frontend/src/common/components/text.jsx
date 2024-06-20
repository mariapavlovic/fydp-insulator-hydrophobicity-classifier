import { Text } from "@rneui/themed";

export const Bold = ({...props}) => <Text style={{fontFamily: 'Inter Bold', ...props.style}}{...props}/>

export const Header = ({...props}) => <Text h1={true} {...props}/>
export const Title = ({...props}) => <Text style={{fontSize: 24, fontWeight: 'bold', ...props.style}}{...props}/>