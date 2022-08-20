import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { voteOpportunity } from "../../components/transaction/TransactionHelper";
import { getExtendableTextBreakup } from "../../services/displayTextHelper";
import DocumentCard from "../../tools/Card/DocumentCard";
import Email from "../SVGIcons/Email";
import LinkedIn from "../SVGIcons/LinkedIn";
import Twitter from "../SVGIcons/Twitter";
import Website from "../SVGIcons/Website";

const PoolDetails = () => {
  const location = useLocation();
  const [expand, setExpand] = useState(false);
  const [approveStatus, setApproveStatus] = useState(false);
  const [opDetails, setOpDetails] = useState();
  const [companyDetails, setCompanyDetails] = useState();
  const [info, setInfo] = useState([]);
  const [loanPurpose, setLoanPurpose] = useState({
    isSliced: false,
    firstText: "",
    secondText: "",
  });

  const [status, setStatus] = useState({
    approve: false,
    unsure: false,
    reject: false,
  });

  useEffect(() => {
    setOpDetails(location.state);
  }, []);

  useEffect(() => {
    if (opDetails) {
      loadInfo();
      loadLoanPurpose();
      setCompanyDetails(opDetails.companyDetails);
      console.log(opDetails.companyDetails);
    }
  }, [opDetails]);

  function loadInfo() {
    if (opDetails) {
      setInfo([
        {
          label: "Opening Date",
          value: opDetails.createdOn ? opDetails.createdOn : "--",
        },
        {
          label: "Payment Frequency",
          value: opDetails.paymentFrequencyInDays
            ? opDetails.paymentFrequencyInDays
            : "--",
        },
        {
          label: "Borrower Address",
          value: opDetails.borrowerDisplayAdd
            ? opDetails.borrowerDisplayAdd
            : "--",
        },
        {
          label: "Interest Rate",
          value: opDetails.loanInterest ? opDetails.loanInterest : "--",
        },
        {
          label: "Payment Tenure",
          value: opDetails.loanTenure ? opDetails.loanTenure : "--",
        },
        {
          label: "Drawdown Cap",
          value: opDetails.opportunityAmount
            ? opDetails.opportunityAmount
            : "--",
        },
      ]);
      console.log(info);
    }
  }

  function loadLoanPurpose() {
    if (!opDetails || !opDetails.loan_purpose) {
      return;
    }
    const { isSliced, firstText, secondText } = getExtendableTextBreakup(
      opDetails.loan_purpose,
      200
    );
    if (isSliced) {
      setLoanPurpose({
        firstText: firstText,
        secondText: secondText,
        isSlied: isSliced,
      });
    } else {
      setLoanPurpose({
        firstText: firstText,
        isSliced: isSliced,
      });
    }
  }

  function updateStatus(vote) {
    if (vote == "1") {
      setStatus({ approve: false, unsure: false, reject: true });
    } else if (vote == "2") {
      setStatus({ approve: true, unsure: false, reject: false });
    } else if (vote == "3") {
      setStatus({ approve: false, unsure: true, reject: false });
    }
  }

  async function vote(voteID) {
    const result = await voteOpportunity(opDetails.id, voteID);
    if (result) {
      updateStatus(voteID);
    }
  }

  return (
    <div>
      <div
        className="flex-row justify-between items-center"
        style={{ display: "flex" }}
      >
        <div className="flex-col">
          <div style={{ fontSize: 28 }} className="mb-0">
            {opDetails?.loan_name}
          </div>
          <small style={{ color: "#64748B", fontSize: 14 }}>
            {companyDetails?.companyName}
          </small>
        </div>
        <div className="mr-10">
          {status.approve ||
          !(status.approve || status.reject || status.unsure) ? (
            <button
              disabled={status.approve}
              onClick={() => vote("2")}
              style={{
                borderRadius: "100px",
                padding: "3px 16px",
                borderColor: "#10B981",
                borderWidth: 2,
              }}
              className="ml-3 btn btn-xs btn-outline text-[#10B981] text-xs capitalize"
            >
              {status.approve ? "Approved" : "Approve"}
            </button>
          ) : null}

          {status.reject ||
          !(status.approve || status.reject || status.unsure) ? (
            <button
              disabled={status.reject}
              onClick={() => vote("1")}
              style={{
                borderRadius: "100px",
                padding: "3px 16px",
                borderColor: "#EF4444",
                borderWidth: 2,
              }}
              className="ml-3 btn-xs btn-outline text-[#EF4444] text-xs capitalize"
            >
              {status.reject ? "Rejected" : "Reject"}
            </button>
          ) : null}
          {/* {status.unsure ||
          !(status.approve || status.reject || status.unsure) ? (
            <button
              disabled={status.unsure}
              onClick={() => vote("3")}
              style={{ borderRadius: "100px", padding: "3px 16px" }}
              className="ml-3 btn btn-xs btn-outline text-white text-xs capitalize"
            >
              Unsure
            </button>
          ) : null} */}
        </div>
      </div>

      <div
        className="flex-row justify-between items w-full"
        style={{ display: "flex" }}
      >
        <div style={{ display: "flex" }} className="flex-col ">
          <div
            style={{ display: "flex" }}
            className="flex-row justify-between mt-10 mb-3"
          >
            <div style={{ fontSize: 19 }} className="mb-0">
              Deals Overview
            </div>
          </div>
          <div style={{ color: "#D0D5DD" }}>
            {loanPurpose.isSliced ? (
              <div>
                {loanPurpose.firstText}
                <a
                  style={{ fontWeight: 600, cursor: "pointer" }}
                  onClick={() => setExpand(true)}
                >
                  {expand ? null : "view more"}
                </a>
                {expand ? <div>{loanPurpose.secondText}</div> : null}
                <a
                  style={{ fontWeight: 600, cursor: "pointer" }}
                  onClick={() => setExpand(false)}
                >
                  {expand ? "view less" : null}
                </a>
              </div>
            ) : (
              <div>{loanPurpose.firstText} </div>
            )}
          </div>
        </div>
      </div>

      {/* Deal Terms */}

      <div style={{ display: "flex" }} className="flex-col w-full">
        <div
          style={{ display: "flex" }}
          className="flex-row justify-between mt-10 mb-3"
        >
          <div style={{ fontSize: 19 }} className="mb-0">
            Deals terms
          </div>
        </div>

        <div
          className=" flex-col  justify-center w-full rounded-box"
          style={{
            display: "flex",
            background: " #20232A",
            borderRadius: "12px",
          }}
        >
          <div style={{ display: "flex" }} className="w-full">
            {info ? (
              info.map((e, i) => {
                return (
                  <div
                    className="justify-center w-1/3 flex-col items-center "
                    style={{
                      display: "flex",
                      borderRight: "0.5px solid   #292C33",
                      borderBottom: "0.5px solid   #292C33",
                      padding: "40px 0",
                    }}
                  >
                    <div style={{ fontSize: 14, color: "#A0ABBB" }}>
                      {e.label}
                    </div>
                    <div style={{ fontSize: 20 }}>{e.value}</div>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <div style={{ margin: "20px 0" }}>
        <div style={{ margin: "10px 0", marginTop: "40px", fontSize: 19 }}>
          Collateral
        </div>
        <div
          className="w-full"
          style={{
            background: "#20232A",
            borderRadius: "12px",
            padding: "10px",
          }}
        >
          <div style={{ fontSize: "14px", color: "#64748B" }}>
            Name of documents - {opDetails?.collateral_document_name}
          </div>
          <div>Document descripton</div>
          <div style={{ fontSize: 14, color: "#64748B" }}>
            {opDetails?.collateral_document_description}
          </div>
        </div>
      </div>

      <div
        style={{ display: "flex", marginTop: "50px" }}
        className="flex-col w-full"
      >
        <div style={{ marginTop: "40px", fontSize: 19 }}>Borrower Details</div>
        <div
          style={{ display: "flex" }}
          className="flex-row justify-between mt-5 mb-3"
        >
          <div style={{ fontSize: 16 }} className="mb-0">
            {companyDetails
              ? companyDetails.companyName
              : "Name of the Company"}
          </div>
          <div>
            {companyDetails?.twitter ? (
              <button
                id="twitter"
                style={{
                  borderRadius: "100px",
                  padding: "8px 12px",
                  border: "1px solid #64748B",
                }}
                className="ml-3 btn btn-sm btn-outline text-white"
                // onClick={redirectToURl}
              >
                <Twitter />
                <div style={{ marginLeft: 2, textTransform: "lowercase" }}>
                  twitter
                </div>
              </button>
            ) : (
              <></>
            )}
            {companyDetails?.linkedin ? (
              <button
                id="linkedin"
                style={{
                  borderRadius: "100px",
                  padding: "8px 12px",
                  border: "1px solid #64748B",
                }}
                className="ml-3 btn btn-sm btn-outline text-white"
                //onClick={redirectToURl}
              >
                <LinkedIn />
                <div style={{ marginLeft: 2, textTransform: "lowercase" }}>
                  LinkedIn
                </div>
              </button>
            ) : (
              <></>
            )}
            {companyDetails?.email ? (
              <button
                id="email"
                style={{
                  borderRadius: "100px",
                  padding: "8px 12px",
                  border: "1px solid #64748B",
                }}
                className="ml-3 btn btn-sm btn-outline text-white"
                //onClick={redirectForEmail}
              >
                <Email />
                <div style={{ marginLeft: 2, textTransform: "lowercase" }}>
                  Email
                </div>
              </button>
            ) : (
              <></>
            )}
            {companyDetails?.website ? (
              <button
                id="website"
                style={{
                  borderRadius: "100px",
                  padding: "8px 12px",
                  border: "1px solid #64748B",
                }}
                className="ml-3 btn btn-sm btn-outline text-white"
                //onClick={redirectToURl}
              >
                <Website />
                <div style={{ marginLeft: 2, textTransform: "lowercase" }}>
                  Website
                </div>
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div style={{ color: "#D0D5DD" }}>
          {companyDetails ? companyDetails.companyBio : ""}
        </div>
      </div>
      {/* <div className="w-1/2">
        <div style={{ margin: "10px 0", marginTop: "40px", fontSize: 19 }}>
          KYC Details
        </div>
      </div> */}
      <div className="w-1/2">
        <div style={{ margin: "10px 0", marginTop: "40px", fontSize: 19 }}>
          KYB Details
        </div>
        <h6 style={{ marginTop: 10, marginBottom: 3, color: "#64748B" }}>
          Business Identify Proof
        </h6>
        <DocumentCard
          docName={
            companyDetails
              ? companyDetails.businessIdFile.businessIdDocName
              : ""
          }
          docCid={
            companyDetails
              ? companyDetails.businessIdFile.businessIdFileCID
              : null
          }
          fileName={
            companyDetails
              ? companyDetails.businessIdFile.businessIdFileName
              : null
          }
        />

        <h6 style={{ marginTop: 10, marginBottom: 3, color: "#64748B" }}>
          Business Address Proof
        </h6>
        <DocumentCard
          docName={
            companyDetails
              ? companyDetails.businessAddFile.businessAddDocName
              : ""
          }
          docCid={
            companyDetails
              ? companyDetails.businessAddFile.businessAddFileCID
              : null
          }
          fileName={
            companyDetails
              ? companyDetails.businessAddFile.businessAddFileName
              : null
          }
        />
        <h6 style={{ marginTop: 10, marginBottom: 3, color: "#64748B" }}>
          Business Incorporation Proof
        </h6>
        <DocumentCard
          docName={
            companyDetails
              ? companyDetails.businessIncoFile.businessIncoDocName
              : ""
          }
          docCid={
            companyDetails
              ? companyDetails.businessIncoFile.businessIncoFileCID
              : null
          }
          fileName={
            companyDetails
              ? companyDetails.businessIncoFile.businessIncoFileName
              : null
          }
        />
        {companyDetails && companyDetails.businessLicFile ? (
          <>
            <h6 style={{ marginTop: 10, marginBottom: 3, color: "#64748B" }}>
              Business License Proof
            </h6>
            <DocumentCard
              docName={
                companyDetails
                  ? companyDetails.businessLicFile.businessLicDocName
                  : ""
              }
              docCid={
                companyDetails
                  ? companyDetails.businessLicFile.businessLicFileCID
                  : null
              }
              fileName={
                companyDetails
                  ? companyDetails.businessLicFile.businessLicFileName
                  : null
              }
            />
          </>
        ) : (
          <></>
        )}
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default PoolDetails;
