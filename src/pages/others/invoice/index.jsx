import InvoiceComponent from "@/components/invoice/Invoice";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Invoice | WedEazzy - Your Dream Wedding Partner",
  description: "WedEazzy - Your Dream Wedding Partner",
};

const Invoice = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <InvoiceComponent />
    </>
  );
};

export default Invoice;
