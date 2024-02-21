import { useState } from "react";
import Dropdown from "../../components/dropdown/Dropdown";

const Languages = [
  "Python",
  "Java",
  "JavaScript",
  "C++",
  "C#",
  "Ruby",
  "Swift",
  "Go",
  "Rust",
  "PHP",
  "Kotlin",
  "TypeScript",
  "Perl",
  "MATLAB",
  "HTML/CSS",
];

const Frameworks = [
  { id: 1, name: "Angular" },
  { id: 2, name: "Next JS" },
  { id: 3, name: "Vue JS" },
  { id: 4, name: "Solid JS" },
];

const Tools = [
  { id: 1, value: "VS Code", name: "VS Code" },
  { id: 2, value: "Postman", name: "Postman" },
  {
    id: 3,
    value: "Github",
    name: "Github",
  },
  { id: 4, value: "JetBrains Toolbox", name: "JetBrains Toolbox" },
];

const Networks = [
  { id: 1, name: "Facebook", icon: <i className="fa-brands fa-facebook"></i> },
  { id: 2, name: "Twitter", icon: <i className="fa-brands fa-twitter"></i> },
  {
    id: 3,
    name: "Linkedin",
    icon: <i className="fa-brands fa-linkedin"></i>,
  },
  {
    id: 4,
    name: "Discord",
    icon: <i className="fa-brands fa-discord"></i>,
  },
  { id: 5, name: "Youtube", icon: <i className="fa-brands fa-youtube"></i> },
];

export default function DropdownPage() {
  const [option, setOption] = useState(Languages[0] || null);
  const [framework, setFramework] = useState(Frameworks[0] || null);
  const [tool, setTool] = useState(Tools[0] || null);
  const [network, setNetwork] = useState(Networks[0] || null);

  return (
    <div className="dropdown-page">
      <Dropdown
        fontSize={"15px"}
        color={"blue"}
        optionColor={"green"}
        optionFontSize={"2rem"}
        options={Languages}
        currentOption={option}
        onChange={setOption}
      />
      <Dropdown
        options={Frameworks}
        currentOption={framework}
        onChange={setFramework}
      />

      <Dropdown options={Tools} currentOption={tool} onChange={setTool} />
      <Dropdown
        options={Networks}
        currentOption={network}
        onChange={setNetwork}
      />
    </div>
  );
}
