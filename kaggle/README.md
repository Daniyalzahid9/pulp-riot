# ⚡ PULP RIOT™ — Kaggle + Higgsfield Motion Generation Pipeline

Automated cloud video synthesis pipeline for **PULP RIOT™**, combining Higgsfield AI models (Seedance / Sora), OpenKatana motion choreography, credit safety guardrails, and neural AI voiceover.

## 🚀 Features
1. **Free Cloud GPU Execution**: Runs on Kaggle's free weekly 30h GPU quotas (Nvidia T4 / P100) or Colab.
2. **Strict Credit Guardrails**: Built-in budget estimator prevents unintended credit consumption by enforcing hard caps on scene generations.
3. **Pacing**: Generates high-voltage 30–40s motion cuts without filler or slideshow artifacts.
4. **Kinetic Typography & AI Narration**: Edge-TTS neural speech synchronized with brand colorway transitions.

---

## 🛠️ Quickstart on Kaggle

### 1. Create a Kaggle Notebook
1. Navigate to [Kaggle Notebooks](https://www.kaggle.com/code).
2. Click **New Notebook**.
3. Under **Notebook Options** (right sidebar):
   - Set **Accelerator** to **GPU T4 x2** or **GPU P100**.
   - Turn **Internet** to **ON**.

### 2. Add Secrets (Optional)
If running Higgsfield cloud generation:
- Click **Add-ons** > **Secrets**.
- Add label: `HIGGSFIELD_API_TOKEN` with your Higgsfield token value.

### 3. Run Pipeline
Upload `pulp_riot_higgsfield_pipeline.ipynb` and click **Run All**.
The synthesized 35-second master video will be output directly to `/kaggle/working/pulp-riot-kaggle-master.mp4`.
