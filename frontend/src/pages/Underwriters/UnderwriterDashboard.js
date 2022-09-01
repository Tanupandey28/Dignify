import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import Header from "../Layout/Header";

const UnderwriterDashboard = () => {
	const [color, setColor] = useState(false);
	const [color2, setColor2] = useState(false);
	const [linkStatus, setLinkStatus] = useState(false);

	const handleChange = (e) => {
		setLinkStatus(e.target.checked);
	};

	const historyIcon = (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M13 3C10.6131 3 8.32387 3.94821 6.63604 5.63604C4.94821 7.32387 4 9.61305 4 12H1L4.89 15.89L4.96 16.03L9 12H6C6 8.13 9.13 5 13 5C16.87 5 20 8.13 20 12C20 15.87 16.87 19 13 19C11.07 19 9.32 18.21 8.06 16.94L6.64 18.36C7.47341 19.198 8.46449 19.8627 9.55606 20.3158C10.6476 20.769 11.8181 21.0015 13 21C15.3869 21 17.6761 20.0518 19.364 18.364C21.0518 16.6761 22 14.3869 22 12C22 9.61305 21.0518 7.32387 19.364 5.63604C17.6761 3.94821 15.3869 3 13 3ZM12 8V13L16.25 15.52L17.02 14.23L13.5 12.14V8H12Z"
				fill={color2 ? "#9281FF" : "#64748B"}
			/>
		</svg>
	);

	const listIcon = (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M21.75 4.5C21.9489 4.5 22.1397 4.57902 22.2803 4.71967C22.421 4.86032 22.5 5.05109 22.5 5.25V18.75C22.5 18.9489 22.421 19.1397 22.2803 19.2803C22.1397 19.421 21.9489 19.5 21.75 19.5H2.25C2.05109 19.5 1.86032 19.421 1.71967 19.2803C1.57902 19.1397 1.5 18.9489 1.5 18.75V5.25C1.5 5.05109 1.57902 4.86032 1.71967 4.71967C1.86032 4.57902 2.05109 4.5 2.25 4.5H21.75ZM2.25 3C1.65326 3 1.08097 3.23705 0.65901 3.65901C0.237053 4.08097 0 4.65326 0 5.25L0 18.75C0 19.3467 0.237053 19.919 0.65901 20.341C1.08097 20.7629 1.65326 21 2.25 21H21.75C22.3467 21 22.919 20.7629 23.341 20.341C23.7629 19.919 24 19.3467 24 18.75V5.25C24 4.65326 23.7629 4.08097 23.341 3.65901C22.919 3.23705 22.3467 3 21.75 3H2.25Z"
				fill={color ? "#9281FF" : "#64748B"}
			/>
			<path
				d="M7.5 12C7.5 11.8011 7.57902 11.6103 7.71967 11.4697C7.86032 11.329 8.05109 11.25 8.25 11.25H18.75C18.9489 11.25 19.1397 11.329 19.2803 11.4697C19.421 11.6103 19.5 11.8011 19.5 12C19.5 12.1989 19.421 12.3897 19.2803 12.5303C19.1397 12.671 18.9489 12.75 18.75 12.75H8.25C8.05109 12.75 7.86032 12.671 7.71967 12.5303C7.57902 12.3897 7.5 12.1989 7.5 12ZM7.5 8.25C7.5 8.05109 7.57902 7.86032 7.71967 7.71967C7.86032 7.57902 8.05109 7.5 8.25 7.5H18.75C18.9489 7.5 19.1397 7.57902 19.2803 7.71967C19.421 7.86032 19.5 8.05109 19.5 8.25C19.5 8.44891 19.421 8.63968 19.2803 8.78033C19.1397 8.92098 18.9489 9 18.75 9H8.25C8.05109 9 7.86032 8.92098 7.71967 8.78033C7.57902 8.63968 7.5 8.44891 7.5 8.25ZM7.5 15.75C7.5 15.5511 7.57902 15.3603 7.71967 15.2197C7.86032 15.079 8.05109 15 8.25 15H18.75C18.9489 15 19.1397 15.079 19.2803 15.2197C19.421 15.3603 19.5 15.5511 19.5 15.75C19.5 15.9489 19.421 16.1397 19.2803 16.2803C19.1397 16.421 18.9489 16.5 18.75 16.5H8.25C8.05109 16.5 7.86032 16.421 7.71967 16.2803C7.57902 16.1397 7.5 15.9489 7.5 15.75ZM6 8.25C6 8.44891 5.92098 8.63968 5.78033 8.78033C5.63968 8.92098 5.44891 9 5.25 9C5.05109 9 4.86032 8.92098 4.71967 8.78033C4.57902 8.63968 4.5 8.44891 4.5 8.25C4.5 8.05109 4.57902 7.86032 4.71967 7.71967C4.86032 7.57902 5.05109 7.5 5.25 7.5C5.44891 7.5 5.63968 7.57902 5.78033 7.71967C5.92098 7.86032 6 8.05109 6 8.25ZM6 12C6 12.1989 5.92098 12.3897 5.78033 12.5303C5.63968 12.671 5.44891 12.75 5.25 12.75C5.05109 12.75 4.86032 12.671 4.71967 12.5303C4.57902 12.3897 4.5 12.1989 4.5 12C4.5 11.8011 4.57902 11.6103 4.71967 11.4697C4.86032 11.329 5.05109 11.25 5.25 11.25C5.44891 11.25 5.63968 11.329 5.78033 11.4697C5.92098 11.6103 6 11.8011 6 12ZM6 15.75C6 15.9489 5.92098 16.1397 5.78033 16.2803C5.63968 16.421 5.44891 16.5 5.25 16.5C5.05109 16.5 4.86032 16.421 4.71967 16.2803C4.57902 16.1397 4.5 15.9489 4.5 15.75C4.5 15.5511 4.57902 15.3603 4.71967 15.2197C4.86032 15.079 5.05109 15 5.25 15C5.44891 15 5.63968 15.079 5.78033 15.2197C5.92098 15.3603 6 15.5511 6 15.75Z"
				fill={color ? "#9281FF" : "#64748B"}
			/>
		</svg>
	);

	return (
		<div className="bg-[#14171F]">
			<Header linkStatus={linkStatus} />
			<div className="drawer drawer-mobile">
				<input
					id="dashboard-sidebar"
					type="checkbox"
					className="drawer-toggle"
					checked={linkStatus}
					onChange={handleChange}
				/>
				<div
					className={`mt-6 drawer-content text-white ${
						linkStatus ? "blur-sm lg:blur-none" : ""
					}`}
				>
					<div className="px-5">
						<Outlet></Outlet>
					</div>
				</div>

				<div
					// style={{ borderRight: "1px solid #20232A" }}
					className="drawer-side border-r-[#20232A]"
				>
					<label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
					<ul className="menu  overflow-y-auto w-60  text-white bg-darkmode-900 -mr-5">
						<li
							className={`font-medium text-center ${
								color ? "bg-[#3A3C43]" : ""
							} ${color ? "text-[#9281FF] " : "text-[#64748B]"}`}
						>
							<Link
								to="/underwriterDashboard"
								onClick={() => {
									if (color) {
										setColor(false);
									} else {
										setColor(true);
										setColor2(false);
									}
								}}
							>
								<span className="ml-6">{listIcon}</span> Borrow request
							</Link>
						</li>
						<li
							className={`font-medium ${color2 ? "bg-[#3A3C43]" : ""} ${
								color2 ? "text-[#9281FF]" : "text-[#64748B]"
							}`}
						>
							<Link
								to="/underwriterDashboard/approvalHistory"
								onClick={() => {
									if (color2) {
										setColor2(false);
									} else {
										setColor2(true);
										setColor(false);
									}
								}}
							>
								<span className="ml-6">{historyIcon}</span> Approval history
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default UnderwriterDashboard;
