import { createPortal } from "react-dom";
import { CircleX } from "../common/icons";
import { Document } from "../../features/invoicing/components";
import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  useLoaderData,
  useSearchParams,
  useNavigate,
  Await,
  useParams,
  useLocation,
} from "react-router-dom";
import DocPreview from "../../features/invoicing/components/document/DocPreview";
import { Suspense } from "react";
import { Button } from "../common/forms";
import { GiShare } from "react-icons/gi";
import { ShareInvoiceService } from "../../services";
import { toast } from "react-toastify";

const InvoicePreview = () => {
  const data = useLoaderData();
  console.log("Data: ", data);

  const [searchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const from = searchParams.get("from") ?? "/invoices";

  const handleClose = () => navigate(from, { replace: true });
  const handleInvoiceShare = async () => {
    try {
      const shareInvoiceLink = await ShareInvoiceService.generateShareLink(
        params.id
      );
      await navigator.clipboard.writeText(shareInvoiceLink.share_url);
      toast.success("Invoice share link copied to clipboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return createPortal(
    <div className="fixed top-0 bg-white h-screen w-screen overflow-y-auto">
      <div className="flex flex-col h-full container mx-auto pt-16 lg:pt-8">
        <header className="flex flex-shrink-0 w-full justify-between px-5">
          <h1 className="font-archivo font-normal text-xl leading-110 tracking-normal">
            Preview
          </h1>
          {!location.pathname.startsWith("/invoice/shared") && (
            <button
              onClick={handleClose}
              className="outline-none bg-transparent"
            >
              <CircleX variation="black" />
            </button>
          )}
        </header>
        <main className="grid grid-cols-1 lg:grid-cols-2 flex-1 overflow-hidden">
          <section className="flex flex-1 overflow-hidden flex-col lg:py-4 px-6 lg:px-0 gap-y-4 lg:col-span-1">
            <div className="h-full w-full overflow-y-auto">
              <Suspense
                fallback={
                  <div className="w-full h-full">
                    <div className="w-full h-full flex-1 animate-pulse bg-grey"></div>
                  </div>
                }
              >
                <Await resolve={data?.invoice}>
                  {(data) => {
                    return <DocPreview data={data} />;
                  }}
                </Await>
              </Suspense>
            </div>
          </section>
          <section className="flex lg:h-full flex-col p-8 justify-center flex-shrink-0">
            <div className="flex flex-col gap-y-16 lg:max-w-[26rem]">
              {!location.pathname.startsWith("/invoice/shared") && (
                <div className="flex justify-between w-full">
                  <h4 className="font-archivo font-normal text-medium leading-140 tracking-0">
                    Add A Letterhead
                  </h4>
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="relative w-11 h-6 ring-1 ring-black peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-black rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-black after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-white peer-checked:bg-accent"></div>
                  </label>
                </div>
              )}
              <Suspense
                fallback={
                  <Button className="font-bold text-large py-5" disabled>
                    Download
                  </Button>
                }
              >
                <Await resolve={data?.invoice}>
                  {(data) => {
                    return (
                      <div className="flex flex-col  gap-y-4">
                        <PDFDownloadLink
                          className="font-satoshi tracking-normal text-center leading-100 font-bold text-large py-5 bg-accent border border-accent text-white disabled:bg-greyborder disabled:text-white disabled:border-greyborder hover:border-black hover:bg-black hover:text-white"
                          document={<Document data={data} />}
                          fileName={
                            `#${data?.invoice_no}.pdf` || "#invoice.pdf"
                          }
                        >
                          {({ loading }) =>
                            loading ? "Loading ..." : "Download"
                          }
                        </PDFDownloadLink>
                        {!location.pathname.startsWith("/invoice/shared") && (
                          <Button
                            className="font-bold text-large py-4 gap-x-2 flex justify-center items-center group"
                            kind={"secondary"}
                            onClick={handleInvoiceShare}
                          >
                            <GiShare className="w-6 h-6 lg:h-8 lg:w-8 text-accent group-disabled:text-greyborder group-hover:text-black" />{" "}
                            Share
                          </Button>
                        )}
                      </div>
                    );
                  }}
                </Await>
              </Suspense>
            </div>
          </section>
        </main>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default InvoicePreview;
