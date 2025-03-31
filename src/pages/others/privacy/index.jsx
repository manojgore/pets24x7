import CallToActions from "@/components/common/CallToActions";
import Header1 from "@/components/header/header-1";
import DefaultFooter from "@/components/footer/default";
import MetaComponent from "@/components/common/MetaComponent";
import { PrivacyPage } from "@/components/common/PrivacyPage";



const metadata = {
  title: "Privacy Policy | WedEazzy - Your Dream Wedding Partner",
  description: "WedEazzy - Your Dream Wedding Partner",
};

const Privacy = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header1 staticHeader={true}/>
      {/* End Header 1 */}

      <section className="layout-pt-lg layout-pb-lg">
        <div className="container">
          <div className="tabs js-tabs">
            <PrivacyPage />
          </div>
        </div>
      </section>
      {/* End terms section */}

      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
      {/* End Call To Actions Section */}
    </>
  );
};

export default Privacy;
