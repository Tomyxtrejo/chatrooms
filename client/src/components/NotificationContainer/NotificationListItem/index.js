import React from 'react';
import DropdownItem from 'react-bootstrap/DropdownItem';

const CustomItem = React.forwardRef(({ children, className, style }, ref) => (
    <div
        ref={ref}
        className={className}
        style={style}
    >
        {children}
    </div>
))

const NotificationListItem = (props) => {
    console.log("item. title: " + props.notification.title)
    return (
        <DropdownItem as={CustomItem}>
            nblah abl blhjljaljgjjkfgklkjkgjkfgjfkgj
        </DropdownItem>
    );
}

export default NotificationListItem;
