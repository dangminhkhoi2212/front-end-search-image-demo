"use client";
import { Image, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import React, { useState } from "react";

import ListImage, { TImage } from "./ListImage";

import type { GetProp, UploadFile, UploadProps } from "antd";
const getBase64 = (file: FileType): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const url = process.env.NEXT_PUBLIC_SERVER;
const UploadFile: React.FC = () => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	const [images, setImages] = useState<TImage[]>([]);
	const [loading, setLoading] = useState(false);

	const handleChange: UploadProps["onChange"] = ({ file, event }) => {
		setFileList([file]);
		handleSearch(file);
	};
	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as FileType);
		}

		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
	};
	const handleSearch = async (file: UploadFile) => {
		try {
			setLoading(true);
			const formData = new FormData();
			formData.append("image", file.originFileObj as FileType);
			const response = (
				await axios.post(url + "/search", formData, {
					method: "POST",
					headers: {
						contentType: "multipart/form-data",
					},
				})
			).data;
			setImages(response);
			console.log("🚀 ~ handleSearch ~ response:", response);
		} catch (error) {
			console.log("🚀 ~ handleSearch ~ error:", error);
			setImages([]);
		} finally {
			setLoading(false);
		}
	};

	const reset = () => {
		setFileList([]);
		setPreviewOpen(false);
		setPreviewImage("");
		setImages([]);
	};
	return (
		<div className="flex flex-col h-full overflow-auto gap-5 p-10 w-full">
			<ImgCrop rotationSlider maxZoom={10}>
				<Upload
					listType="picture-card"
					fileList={fileList}
					onChange={handleChange}
					onPreview={handlePreview}
					onRemove={() => reset()}
				>
					{fileList.length < 5 && "+ Upload"}
				</Upload>
			</ImgCrop>

			{previewImage && (
				<Image
					wrapperStyle={{ display: "none" }}
					alt="example"
					preview={{
						visible: previewOpen,
						onVisibleChange: (visible) => setPreviewOpen(visible),
						afterOpenChange: (visible) =>
							!visible && setPreviewImage(""),
					}}
					src={previewImage}
				/>
			)}
			<ListImage images={images} loading={loading} />
		</div>
	);
};

export default UploadFile;
