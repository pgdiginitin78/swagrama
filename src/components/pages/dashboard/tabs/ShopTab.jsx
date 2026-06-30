import React, { useState } from "react";
import GenericSection from "../components/GenericSection";
import ActivityDetailsDrawer from "../components/ActivityDetailsDrawer";
import { Receipt as ReceiptIcon } from "@mui/icons-material";

const ShopTab = ({ user }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // Future implementation: Fetch order history here
  
  return (
    <>
      <GenericSection
        title="Order History"
        icon={<ReceiptIcon sx={{ fontSize: 20 }} />}
        data={orderHistory}
        setSelectedItem={setSelectedItem}
      />
      <ActivityDetailsDrawer
        item={selectedItem}
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
};

export default ShopTab;
