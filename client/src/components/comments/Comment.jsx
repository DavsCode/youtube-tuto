import React from "react";
import Avatar from "../custom/Avatar";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FaShare } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";

export default function Comment() {
  return (
    <div className="comment-item">
      <div className="user-infos">
        <a href={`/channel/xyz`} className="channel-avatar">
          <Avatar size={26} />
        </a>

        <div className="info-wrapper">
          <a href={`/channel/xyz`} className="channel-name">
            John Doe
          </a>
          <span className="timeline">2 days ago</span>
        </div>
      </div>

      <div className="comment-body">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          libero ea accusantium neque debitis earum voluptates, temporibus
          commodi aut ipsum?
        </p>
      </div>

      <div className="comments-actions">
        <div className="action-item like">
          <FaRegHeart />
          <span>30</span>
        </div>
        <div className="action-item">
          <FaShare />
        </div>
        <div className="action-item">
          <HiDotsHorizontal />
        </div>
      </div>
    </div>
  );
}
