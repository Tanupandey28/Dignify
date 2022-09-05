import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOpportunity } from "../../../../services/BackendConnectors/opportunityConnectors";
import { getBorrowerDetails } from "../../../../services/BackendConnectors/userConnectors/borrowerConnectors";
import Stepper from "../../LoanForm/Stepper";
import Account from "../../LoanForm/Steps/Account";
import Details from "../../LoanForm/Steps/Details";
import Final from "../../LoanForm/Steps/Final";
import { getBinaryFileData } from "../../../../services/Helpers/fileHelper";
import {
	storeFiles,
	makeFileObjects,
	retrieveFiles,
} from "../../../../services/Helpers/web3storageIPFS";

const LoanFormModal = ({
	handleForm,
	setBorrowReqProcess,
	setProcessModal,
}) => {
	const path = useNavigate();

	const [formData, setFormData] = useState({
		loan_name: "",
		loan_type: "0",
		loan_amount: "",
		loan_purpose: "",
		loan_tenure: "",
		loan_interest: "",
		payment_frequency: "",
	});
	const [currentStep, setCurrentStep] = useState(1);
	const [brJson, setBrJson] = useState();
	const [checkBox, setCheckBox] = useState(false);

	useEffect(async () => {
		getBorrowerDetails()
			.then((borrowerCID) => {
				retrieveFiles(borrowerCID, true)
					.then((data) => {
						let read = getBinaryFileData(data);
						read.onloadend = function () {
							let brJson = JSON.parse(read.result);
							setBrJson(brJson);
							console.log(brJson);
						};
					})
					.catch((e) => console.log(e));
			})
			.catch((e) => console.log(e));
	}, []);

	const steps = ["Add Loan Details", "Add Collateral", "Submit for Review"];

	const displayStep = (step) => {
		switch (step) {
			case 1:
				return (
					<Account
						handleNext={handleNext}
						formData={formData}
						handleForm={handleForm}
					/>
				);
			case 2:
				return (
					<Details
						handleNext={handleNext}
						handlePrev={handlePrev}
						formData={formData}
					/>
				);
			case 3:
				return (
					<Final
						handlePrev={handlePrev}
						finalSubmit={finalSubmit}
						formData={formData}
						setCheckBox={setCheckBox}
						checkBox={checkBox}
					/>
				);
			default:
		}
	};
	async function onFileUpload(selectedFile, loan_info) {
		try {
			let collateralHash = await storeFiles(selectedFile);
			let loanInfoFile = makeFileObjects(loan_info, `${collateralHash}.json`);
			let loanInfoHash = await storeFiles(loanInfoFile);

			return [collateralHash, loanInfoHash];
		} catch (error) {
			console.log(error);
		}
	}

	const finalSubmit = async (data) => {
		setProcessModal(true);
		setBorrowReqProcess(true);
		let {
			loan_name,
			loan_type,
			loan_amount,
			loan_purpose,
			loan_tenure,
			loan_interest,
			capital_loss,
			payment_frequency,
			...rest
		} = data;
		loan_tenure = loan_tenure * 30;
		const collateral_document = rest.collateral_document;

		console.log(rest);
		let loanDetails = {
			loan_type,
			loan_amount,
			loan_tenure,
			loan_interest,
			payment_frequency,
			capital_loss: capital_loss ? capital_loss : "0",
		};
		console.log(collateral_document);
		const loan_info = {
			loan_name,
			loan_purpose,
		};
		loan_info.collateral_document_name = rest.collateral_document_name;
		loan_info.collateral_document_description =
			rest.collateral_document_description;

		loan_info.companyDetails = brJson;

		const [collateralHash, loanInfoHash] = await onFileUpload(
			collateral_document,
			loan_info
		);
		loanDetails = { ...loanDetails, collateralHash, loanInfoHash, loan_name };
		// sending data in backend to create opportunity with hash code

		const result = await createOpportunity(loanDetails);
		console.log(result);
		console.log("submitsss", loanDetails);
		setCurrentStep((prevCurrentStep) => prevCurrentStep + 1);
		setBorrowReqProcess(false);
	};

	const handleNext = (newData, value) => {
		if (value === true) {
			let temp = { ...formData, ...newData };
			setFormData(temp);
		} else {
			setFormData((prev) => ({ ...prev, ...newData }));
		}
		setCurrentStep((prevCurrentStep) => prevCurrentStep + 1);
	};

	const handlePrev = (newData, value) => {
		if (value === true) {
			let temp = { ...formData, ...newData };
			setFormData(temp);
		} else {
			setFormData((prev) => ({ ...prev, ...newData }));
		}
		setCurrentStep((prevCurrentStep) => prevCurrentStep - 1);
		displayStep(currentStep);
	};

	return (
		<div>
			<input type="checkbox" id="loanForm-modal" class="modal-toggle" />
			<div
				class="modal block backdrop-blur-xl backdrop-brightness-75 md:flex"
				// style={{ backdropFilter: "brightness(40%) blur(8px)" }}
			>
				<div
					className="w-screen h-screen  md:modal-box md:h-auto md:w-1/2 md:max-w-5xl md:p-0 bg-[#20232A] md:rounded-[16px] "
					// style={{ backgroundColor: "#20232A", borderRadius: "16px" }}
					// class="modal-box w-1/2 max-w-5xl p-0"
				>
					<label
						for="loanForm-modal"
						class="btn btn-ghost absolute right-2 top-2 pb-2 font-bold"
						onClick={() => handleForm()}
					>
						✕
					</label>
					<h3
						// style={{ borderBottom: "2px solid " }}
						className="font-bold text-lg py-3 px-4 border-b-[#292C33] border-b-2"
					>
						Create Borrow Request
					</h3>

					<div className="mx-6  md:mx-auto pb-2 ">
						<div className="mt-5 ">
							<Stepper steps={steps} currentStep={currentStep} />
							<div className="mt-2 p-10 ">{displayStep(currentStep)}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoanFormModal;
