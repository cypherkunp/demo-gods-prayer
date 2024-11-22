import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";

interface BlessingsCardProps {
  blessingsGranted: boolean;
  onReceiveBlessings: () => void;
}

const BlessingsCard = ({
  blessingsGranted,
  onReceiveBlessings,
}: BlessingsCardProps) => {
  if (!blessingsGranted) {
    return (
      <motion.div
        key="request"
        className="w-full bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-700"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-8 flex flex-col items-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
            Prayer for the Demo Gods
          </h2>
          <Button
            onClick={onReceiveBlessings}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md text-lg"
          >
            Receive Blessings
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="granted"
      className="w-full bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-700 md:min-h-[170px]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-8 flex flex-col items-start space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
          Demo Blessings Granted!
        </h2>
        <p className="text-purple-400 font-light ">*Conditions Apply</p>
      </div>
    </motion.div>
  );
};

export default BlessingsCard;
