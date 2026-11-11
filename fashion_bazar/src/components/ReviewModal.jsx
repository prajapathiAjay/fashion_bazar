import { useEffect, useRef, useState } from "react";
import { Star, X, CheckCircle2 } from "lucide-react";
import SmartImage from "./SmartImage";
// import { useAddReviewsMutation } from "../lib/api/reviewApi";

const LABELS = ["", "Poor", "Fair", "Good", "Very good", "Loved it"];
const MAX_COMMENT = 500;

/**
 * Write-a-review modal.
 * Bottom sheet on phones, centred dialog from `sm` up.
 *
 * Props
 *  - open, onClose
 *  - product   : used for the header (name, image, sizes)
 *  - onSubmit  : async ({ productId, rating, title, comment, size }) => void
 *                throw an Error to show its message in the form.
 */
export default function ReviewModal({ open, ...props }) {
  // Content mounts only while open, so the form starts fresh every time
  return open ? <ReviewModalContent {...props} /> : null;
}

function ReviewModalContent({ onClose, product, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [size, setSize] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const dialogRef = useRef(null);
  // const [addReview]=useAddReviewsMutation()
  
  // Keep the latest onClose without re-running the effect below on every render
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // Lock page scroll, close on Escape, focus the dialog
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onCloseRef.current();
    window.addEventListener("keydown", onKey);
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const shown = hover || rating;
  const canSubmit = rating > 0 && comment.trim().length >= 10 && !submitting;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError("");
    try {
      await onSubmit?.({
        productId: product?._id,
        rating,
        title: title.trim(),
        comment: comment.trim(),
        // size,
      });
      // setDone(true);
    } catch (err) {
      setError(err?.data?.message || err?.message || "Could not post your review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const image = product?.images?.[0] || product?.image;

  return (
    <div className="fixed inset-0 z-100 flex items-end justify-center sm:items-center sm:p-6">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-modal-title"
        className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl outline-none sm:max-w-lg sm:rounded-3xl"
      >
        {/* Grab handle (phone) */}
        <span className="mx-auto mt-2.5 h-1.5 w-10 shrink-0 rounded-full bg-line-strong sm:hidden" />

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          {image && (
            <span className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-shimmer">
              <SmartImage src={image} alt="" bg="var(--color-shimmer)" />
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p
              id="review-modal-title"
              className="font-display text-lg font-bold leading-tight text-ink"
            >
              {done ? "Thank you!" : "Write a review"}
            </p>
            <p className="truncate text-xs text-subtle">{product?.name}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist text-ink transition-colors hover:bg-brand-50 hover:text-brand"
          >
            <X size={18} />
          </button>
        </div>

        {done ? (
          /* ---------- Success ---------- */
          <div className="flex flex-col items-center px-6 py-10 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success-50">
              <CheckCircle2 size={30} className="text-success" />
            </span>
            <p className="mt-4 font-display text-xl font-bold text-ink">
              Review posted
            </p>
            <p className="mt-1.5 max-w-xs text-sm text-muted">
              Your review helps other shoppers pick the right fit.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex h-11 items-center rounded-full bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Done
            </button>
          </div>
        ) : (
          /* ---------- Form ---------- */
          <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
              {/* Rating */}
              <fieldset>
                <legend className="text-sm font-bold text-ink">
                  Your rating <span className="text-danger">*</span>
                </legend>
                <div className="mt-3 flex items-center gap-3">
                  <div
                    className="flex gap-1"
                    onMouseLeave={() => setHover(0)}
                    role="radiogroup"
                    aria-label="Rating"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        role="radio"
                        aria-checked={rating === n}
                        aria-label={`${n} star${n > 1 ? "s" : ""}`}
                        onClick={() => setRating(n)}
                        onMouseEnter={() => setHover(n)}
                        className="rounded-md p-0.5 transition-transform hover:scale-110"
                      >
                        <Star
                          size={30}
                          className={
                            n <= shown
                              ? "fill-sun text-sun"
                              : "fill-transparent text-line-hover"
                          }
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-ink-soft">
                    {LABELS[shown]}
                  </span>
                </div>
              </fieldset>

              {/* Size bought */}
              {product?.sizes?.length > 0 && (
                <fieldset>
                  <legend className="text-sm font-bold text-ink">
                    Size you bought{" "}
                    <span className="font-normal text-subtle">(optional)</span>
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.sizes.map((s) => {
                      const active = size === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setSize(active ? "" : s)}
                          className={`h-10 min-w-12 rounded-xl border px-3 text-sm font-semibold transition-colors ${
                            active
                              ? "border-ink bg-ink text-white"
                              : "border-line-strong text-ink-soft hover:bg-mist"
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              )}

              {/* Title */}
              <div>
                <label
                  htmlFor="review-title"
                  className="text-sm font-bold text-ink"
                >
                  Headline{" "}
                  <span className="font-normal text-subtle">(optional)</span>
                </label>
                <input
                  id="review-title"
                  type="text"
                  maxLength={80}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Beautiful fabric, true to size"
                  className="mt-2 h-12 w-full rounded-2xl border border-line-strong bg-snow px-4 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-brand focus:bg-white"
                />
              </div>

              {/* Comment */}
              <div>
                <label
                  htmlFor="review-comment"
                  className="text-sm font-bold text-ink"
                >
                  Your review <span className="text-danger">*</span>
                </label>
                <textarea
                  id="review-comment"
                  rows={4}
                  maxLength={MAX_COMMENT}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="How was the fit, fabric and colour?"
                  className="mt-2 w-full resize-none rounded-2xl border border-line-strong bg-snow px-4 py-3 text-sm leading-relaxed text-ink outline-none transition-colors placeholder:text-faint focus:border-brand focus:bg-white"
                />
                <div className="mt-1 flex justify-between text-[11px] text-subtle">
                  <span>Minimum 10 characters</span>
                  <span>
                    {comment.length}/{MAX_COMMENT}
                  </span>
                </div>
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-2xl bg-danger-50 px-4 py-3 text-sm font-semibold text-danger"
                >
                  {error}
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="grid grid-cols-[auto_1fr] gap-3 border-t border-line bg-white px-5 py-4">
              <button
                type="button"
                onClick={onClose}
                className="h-12 rounded-full border border-line-strong px-5 text-sm font-semibold text-ink transition-colors hover:bg-mist"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!canSubmit}
                className="h-12 rounded-full bg-brand text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-line-strong disabled:text-subtle"
              >
                {submitting ? "Posting…" : "Post review"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
