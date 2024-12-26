import React, { useState, useEffect } from "react";
import { Button, Card, Spin, Modal, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faArrowUpFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { Mosaic } from "react-loading-indicators";
import Questionnaire1 from "./template/Quiz/Questionnaire.jsx";
import Questionnaire2 from "./template/Quiz/Questionnaire1.jsx";
import Questionnaire3 from "./template/Flashcard/QuestionSet.jsx";
import Questionnaire4 from "./template/Math/Setup.jsx";
import TemplateEditor1 from "./template/Quiz/Editor.jsx";
import TemplateEditor2 from "./template/Quiz/Editor1.jsx";
import TemplateEditor3 from "./template/Flashcard/Editor1.jsx";
import "./Prompt.css";

const Prompt = () => {
  const { id } = useParams();
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("1");
  const [loading, setLoading] = useState(false);
  const [genloading, setgenLoading] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [startClicked, setStartClicked] = useState(false);
  const [templateData, setTemplateData] = useState(null);
  const [templateData1, setTemplateData1] = useState(null);
  const [templateData2, setTemplateData2] = useState(null);
  const [isTemplateEditorVisible, setIsTemplateEditorVisible] = useState(false);
  const [
    isTemplateEditorVisibleFill,
    setIsTemplateEditorVisibleFill,
  ] = useState(false);
  const [
    isTemplateEditorVisibleFlash,
    setIsTemplateEditorVisibleFlash,
  ] = useState(false);
  const [DataMath, setDataMath] = useState(null);
  const [DataMCQ, setDataMCQ] = useState(null);
  const [DataFill, setDataFill] = useState(null);
  const [DataFlash, setDataFlash] = useState(null);

  const templateConfigs = {
    1: [
      { value: "1", label: "MCQs" },
      { value: "2", label: "FillUps" },
    ],
    2: [{ value: "1", label: "Maths Game" }],
    3: [{ value: "1", label: "Flash Card" }],
  };

  useEffect(() => {
    console.log("Prompt component mounted. Current ID:", id);
  }, [id]);

  const handleNavigation = () => {
    setgenLoading(true);

    setTimeout(() => {
      const paths = {
        "1": {
          "1": "/temp1",
          "2": "/temp2",
        },
        "2": {
          "1": "/temp3",
        },
        "3": {
          "1": "/temp4",
        },
      };

      const port = window.location.port;

      console.log(port);

      const baseUrl = `${window.location.protocol}//${window.location.hostname}:${port}`;

      const selectedPath = paths[id] && paths[id][selectedTemplate];
      if (selectedPath) {
        const fullUrl = `${baseUrl}${selectedPath}`;
        window.open(fullUrl, "_blank");
      }

      setgenLoading(false);
    }, 3000);
  };

  const renderTemplate = () => {
    let path = "";

    if (id === "1" && selectedTemplate === "1") {
      path = "/temp1";
    } else if (id === "1" && selectedTemplate === "2") {
      path = "/temp2";
    } else if (id === "2" && selectedTemplate === "1") {
      path = "/temp3";
    } else if (id === "3" && selectedTemplate === "1") {
      path = "/temp4";
    }

    if (path) {
      const iframeSrc = `http://localhost:5173${path}`;
      console.log(iframeSrc);
      return (
        <iframe
          src={iframeSrc}
          title={`Project ${id}`}
          style={{
            width: "900px",
            height: "500px",
            border: "none",
          }}
        />
      );
    }
  };

  const handleGenerateQuestions = () => {
    console.log(
      `Generating questions for Template ${selectedTemplate} in App ${id}`
    );
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowQuestionnaire(true);
      console.log("Questions generated and questionnaire shown.");
    }, 2000);
  };

  const handleSubmitData = (data, type, setDataFn) => {
    console.log(`All responses for ${type}:`, data);
    setDataFn(data);
    setShowQuestionnaire(false);
    setStartClicked(false);
  };

  const handleSubmitMCQ = (data) => handleSubmitData(data, "MCQ", setDataMCQ);
  const handleSubmitFill = (data) =>
    handleSubmitData(data, "Fill", setDataFill);
  const handleDataMath = (data) => handleSubmitData(data, "Math", setDataMath);
  const handleDataFlash = (data) =>
    handleSubmitData(data, "Flash", setDataFlash);

  const handleEditTemplate = async (
    data,
    type,
    endpoint,
    setTemplateDataFn,
    setVisibilityFn
  ) => {
    setgenLoading(true);
    setTemplateDataFn(data);
    setVisibilityFn(false);
    console.log(`Edited ${type} template data:`, data);

    try {
      const response = await fetch(`http://127.0.0.1:5000/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(`Updated ${type} template result:`, result);
    } catch (error) {
      console.error(`Error updating ${type} template:`, error);
    } finally {
      setgenLoading(false);
    }
  };

  const handleEditTemplateMCQ = (data) =>
    handleEditTemplate(
      data,
      "MCQ",
      "update-mcq-css",
      setTemplateData,
      setIsTemplateEditorVisible
    );

  const handleEditTemplateFill = (data) =>
    handleEditTemplate(
      data,
      "Fill",
      "update-fill-css",
      setTemplateData1,
      setIsTemplateEditorVisibleFill
    );

  const handleEditTemplateFlash = (data) =>
    handleEditTemplate(
      data,
      "Flash",
      "update-flash-css",
      setTemplateData2,
      setIsTemplateEditorVisibleFlash
    );

  const handleGenerate = async (type, data, endpoint) => {
    setgenLoading(true);
    try {
      console.log(`${type} Data:`, data);

      const response = await fetch(`http://127.0.0.1:5000/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(`Generated ${type} Questions:`, result);
    } catch (error) {
      console.error(`Error generating ${type} questions:`, error);
    } finally {
      setgenLoading(false);
    }
  };

  const handleGenerateMCQ = () =>
    handleGenerate("MCQ", DataMCQ, "generate-mcq");
  const handleGenerateFlash = () =>
    handleGenerate("Flashcard", DataFlash, "generate-flashcards");
  const handleGenerateFill = () =>
    handleGenerate("Fill", DataFill, "generate-fill");
  const handleGenerateMath = () =>
    handleGenerate("Math", DataMath, "generate-math");

  const buttonConfigs = [
    {
      data: DataMCQ,
      id: "1",
      selectedTemplate: "1",
      onClick: handleGenerateMCQ,
    },
    {
      data: DataFill,
      id: "1",
      selectedTemplate: "2",
      onClick: handleGenerateFill,
    },
    {
      data: DataMath,
      id: "2",
      selectedTemplate: "1",
      onClick: handleGenerateMath,
    },
    {
      data: DataFlash,
      id: "3",
      selectedTemplate: "1",
      onClick: handleGenerateFlash,
    },
  ];

  const modalConfigs = [
    {
      isVisible: isTemplateEditorVisible,
      onCancel: () => setIsTemplateEditorVisible(false),
      TemplateComponent: TemplateEditor1,
      onTemplateEdit: handleEditTemplateMCQ,
    },
    {
      isVisible: isTemplateEditorVisibleFill,
      onCancel: () => setIsTemplateEditorVisibleFill(false),
      TemplateComponent: TemplateEditor2,
      onTemplateEdit: handleEditTemplateFill,
    },
    {
      isVisible: isTemplateEditorVisibleFlash,
      onCancel: () => setIsTemplateEditorVisibleFlash(false),
      TemplateComponent: TemplateEditor3,
      onTemplateEdit: handleEditTemplateFlash,
    },
  ];

  const editButtonConfigs = [
    {
      id: "1",
      template: "1",
      onClick: () => setIsTemplateEditorVisible(true),
    },
    {
      id: "1",
      template: "2",
      onClick: () => setIsTemplateEditorVisibleFill(true),
    },
    {
      id: "3",
      template: "1",
      onClick: () => setIsTemplateEditorVisibleFlash(true),
    },
  ];

  return (
    <div className="prompt-container">
      <div className="preview-button-container">
        <Tooltip title="Preview" overlayStyle={{ fontSize: "20px" }}>
          <Button
            type="primary"
            shape="circle"
            icon={<FontAwesomeIcon icon={faEye} />}
            className="preview-button"
            onClick={() => {
              setShowPreview(!showPreview);
              console.log("Preview toggled:", !showPreview);
            }}
          />
        </Tooltip>

        <Tooltip title="FullScreen" overlayStyle={{ fontSize: "20px" }}>
          <Button
            type="primary"
            shape="circle"
            icon={<FontAwesomeIcon icon={faArrowUpFromBracket} />}
            className="preview-button"
            onClick={handleNavigation}
            style={{ marginLeft: "10px" }}
            disabled={loading}
          >
            {genloading && <Spin />}
          </Button>
        </Tooltip>

        {editButtonConfigs.map(
          (config, index) =>
            id === config.id &&
            selectedTemplate === config.template && (
              <Tooltip
                key={index}
                title="Edit"
                overlayStyle={{ fontSize: "20px" }}
              >
                <Button
                  type="primary"
                  shape="circle"
                  icon={<FontAwesomeIcon icon={faEdit} />}
                  className="edit-template-button"
                  onClick={config.onClick}
                  style={{ marginLeft: "10px" }}
                />
              </Tooltip>
            )
        )}
      </div>
      {templateConfigs[id] && (
        <div className="template-select-container">
          <select
            value={selectedTemplate}
            onChange={(e) => {
              setSelectedTemplate(e.target.value);
              console.log("Template selected:", e.target.value);
            }}
            className="template-select"
          >
            {templateConfigs[id].map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {modalConfigs.map(
        ({ isVisible, onCancel, TemplateComponent, onTemplateEdit }, index) => (
          <Modal
            key={index}
            open={isVisible}
            onCancel={onCancel}
            footer={null}
            className="custom-modal"
            centered
          >
            <TemplateComponent onTemplateEdit={onTemplateEdit} />
          </Modal>
        )
      )}
      {!showPreview && !loading && !startClicked && (
        <Button
          className="start1-button"
          onClick={() => {
            handleGenerateQuestions();
            setStartClicked(true);
          }}
          style={{ marginTop: "20px" }}
          disabled={loading}
        >
          {loading ? <Spin size="small" /> : "Start"}
        </Button>
      )}
      {!showPreview &&
        !loading &&
        !startClicked &&
        buttonConfigs.map(
          (
            { data, id: configId, selectedTemplate: configTemplate, onClick },
            index
          ) =>
            data !== null &&
            id === configId &&
            selectedTemplate === configTemplate && (
              <Button
                key={index}
                className="generate-button"
                onClick={onClick}
                style={{ marginTop: "20px" }}
              >
                Generate
              </Button>
            )
        )}
      {!showPreview && !loading && startClicked && showQuestionnaire && (
        <div className="questionnaire-container">
          {id === "1" && selectedTemplate === "1" ? (
            <Questionnaire1 handleSubmitAll={handleSubmitMCQ} />
          ) : id === "1" && selectedTemplate === "2" ? (
            <Questionnaire2 handleSubmitAll={handleSubmitFill} />
          ) : id === "2" && selectedTemplate === "1" ? (
            <Questionnaire4 onDataReceived={handleDataMath} />
          ) : id === "3" && selectedTemplate === "1" ? (
            <Questionnaire3 handleSubmitAll={handleDataFlash} />
          ) : null}
        </div>
      )}
      {showPreview && renderTemplate()}
      {loading && (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      )}
      {/* {<Spin tip="Generating...." spinning={genloading} fullscreen />} */}
      {genloading && (
        <div className="fullscreen-loader">
          <Mosaic color={["#33CCCC", "#33CC36", "#B8CC33", "#FCCA00"]} />
        </div>
      )}
    </div>
  );
};

export default Prompt;
