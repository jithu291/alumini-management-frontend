import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserDataApi } from "../../lib/api/commonApi";
import { Loader2 } from "lucide-react";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [user]);

  const fetchUsers = async () => {
    if (user?.role === "superadmin") {
      setLoading(true);
      try {
        const res = await getUserDataApi();
        setUsers(res || []);
      } catch (err) {
        console.error("Failed to load users:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Please log in to continue.
      </div>
    );
  }

  if (user.role === "student") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-6 bg-white rounded-xl shadow text-gray-800">
          No access for student
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Super Admin Dashboard
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin text-green-600 w-8 h-8" />
        </div>
      ) : users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white rounded-xl overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Name</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Department</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Year of Passing</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Email</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Skills</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Role</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Resume</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr
                  key={u._id || index}
                  className="hover:bg-gray-50 transition-colors border-b"
                >
                  <td className="py-3 px-4">{u.name || "N/A"}</td>
                  <td className="py-3 px-4">{u.department || "N/A"}</td>
                  <td className="py-3 px-4">{u.yearOfPassing || "N/A"}</td>
                  <td className="py-3 px-4">{u.email}</td>
                  <td className="py-3 px-4">{u.skills || "N/A"}</td>
                  <td className="py-3 px-4 capitalize">{u.role}</td>
                  <td className="py-3 px-4">
                    {u.resumePath ? (
                      <a
                        href={u.resumePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline text-sm"
                      >
                        View Resume
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">No Resume</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10">No users found.</p>
      )}
    </div>
  );
}

export default Dashboard;
