import mongoose, { Schema } from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI not found in .env");
    }

    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (e) {
    console.error("DB connection error:", e);
    process.exit(1);
  }
};

/* ================= BLOG SCHEMA ================= */

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 200
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      maxlength: 200
    },
    excerpt: {
      type: String,
      maxlength: 500,
      default: ""
    },
    content: {
      type: String,
      required: true,
      maxlength: 50000
    },
    image: {
      type: String,
      default: ""
    },
    category: {
      type: String,
      maxlength: 100,
      default: ""
    },
    published: {
      type: Boolean,
      default: false
    },
    views: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);


/* ================= FICTION SCHEMA ================= */

const fictionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 200
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      maxlength: 200
    },
    content: {
      type: String,
      required: true,
      maxlength: 50000
    },
    published: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

/* ================= ABOUT ME ================= */

const aboutMeSchema = new Schema(
  {
    // add fields later
  },
  {
    timestamps: true
  }
);

/* ================= WORK SAMPLE SCHEMA ================= */

const workSampleSchema = new Schema(
  {
    title: { type: String, required: true, maxlength: 200 },
    text:  { type: String, required: true, maxlength: 50000 },
  },
  { timestamps: true }
)

/* ================= MODELS ================= */

export const BlogModel = mongoose.model("Blog", blogSchema);
export const FictionModel = mongoose.model("Fiction", fictionSchema);
export const AboutMeModel = mongoose.model("AboutMe", aboutMeSchema);
export const WorkSampleModel = mongoose.model("WorkSample", workSampleSchema);

