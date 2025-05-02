import { Skeleton } from "antd";
import Image from "next/image";
import React from "react";

export type TImage = {
	filename: string;
	score: number;
	id: string;
	image_url: string;
};
type Props = { images: TImage[]; loading: boolean };

const ListImage: React.FC<Props> = ({ images, loading }) => {
	if (loading) {
		return (
			<div className="grid grid-cols-4 gap-4 text-gray-900 w-full">
				{Array.from({ length: 6 }).map((_, i) => (
					<div
						className="col-span-1 flex flex-col gap-4 w-full"
						key={i}
					>
						<Skeleton.Image
							active
							className="relative w-full text-xl"
						/>
						<Skeleton paragraph={{ rows: 0 }} active />
					</div>
				))}
			</div>
		);
	}
	return (
		<div className="grid grid-cols-4 gap-6 text-gray-900">
			{images?.map((img) => (
				<div
					className="col-span-1 flex flex-col items-center gap-4 ring-1 ring-gray-300 p-4 rounded-2xl"
					key={img.id}
				>
					<div className="relative   size-[300px] rounded-2xl overflow-hidden">
						<Image
							src={img.image_url}
							alt={img.filename}
							fill
							sizes="300px"
						/>
					</div>
					<div className="flex flex-col gap-1">
						{img.filename}{" "}
						<span className="italic font-semibold">
							score: {img.score}
						</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default ListImage;
